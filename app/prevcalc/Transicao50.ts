import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import { getContribuicaoTotal, getFatorPrevidenciario } from "./prevcalc2";
import { CalculaIdade } from "./CalculaIdade";
import { LimitaDataCnis } from "./LimitaDataCnis";
import { CalculaCarencias } from "./CalculaCarencias";
import { parseDias } from "./ParseDias";

export const getTransicao50 = async (customerId) => {
    const repository = new EmploymentDatabaseRepository();
    let cnisArray: any = await repository.list(+customerId);

    if (cnisArray.length <= 0) return false;

    let cliente = cnisArray[0].customer;
    let idade = CalculaIdade.execute(cliente);

    let cnisLimitado = LimitaDataCnis.execute(cnisArray, "2019-11-13");

    if (cliente!.gender === "M") {
        var totalDiasNecessarios = 12600;
        var minimoDiasNecessarios = 11880;
    } else {
        var totalDiasNecessarios = 10800;
        var minimoDiasNecessarios = 10080;
    }

    let [anosAteLimite, mesesAteLimite, diasAteLimite] = getContribuicaoTotal(cnisLimitado, cliente!.gender);
    let totalDiasAteLimite = anosAteLimite * 360 + mesesAteLimite * 30 + diasAteLimite;

    let [anosSemLimite, mesesSemLimite, diasSemLimite] = getContribuicaoTotal(cnisArray, cliente!.gender);

    let pedagio = parseDias((totalDiasNecessarios - totalDiasAteLimite) * 0.5);
    let faltanteComPedagio = parseDias((totalDiasNecessarios - totalDiasAteLimite) * 1.5);

    let totalDiasSemLimite = anosSemLimite * 360 + mesesSemLimite * 30 + diasSemLimite;
    let totalNecessarioComPedagio = totalDiasAteLimite + (totalDiasNecessarios - totalDiasAteLimite) * 1.5;

    let contribuidoAposLimite = parseDias(totalDiasSemLimite - totalDiasAteLimite);

    let carencias = CalculaCarencias.execute(cnisArray);
    let carenciasNecessarias = 180;

    let response = {
        idade,
        trabalhado: {
            anosAteLimite,
            mesesAteLimite,
            diasAteLimite,
            isOk: getTrabalhadoIsOk(anosAteLimite, cliente.gender),
        },
        faltante: parseDias(totalDiasNecessarios - totalDiasAteLimite),
        pedagio,
        faltanteComPedagio,
        contribuidoAposLimite,
        carencias: { value: carencias, isOk: carencias >= 180 ? true : false },
        observacao: "",
        fatorPrevidenciario: getFatorPrevidenciario(idade.anos, anosSemLimite),
    };

    if (totalDiasSemLimite >= totalNecessarioComPedagio && totalDiasAteLimite < totalDiasNecessarios) {
        let string1 = `Beneficiário já pagou o pedágio, e já possui o tempo de carência necessário, portanto está apto a aposentadoria pela Transição de 50%.`;
        let string2 = `Beneficiário possui o tempo de serviço, porém não atende o requisito de 180 carências.`;

        response.observacao = carencias >= carenciasNecessarias ? string1 : string2;
    } else if (totalDiasAteLimite >= totalDiasNecessarios) {
        let string1 = `Beneficiário apto a aposentadoria pela Transição de 50%.`;
        let string2 = `Beneficiário possui o tempo de serviço, porém não atende o requisito de 180 carências.`;

        response.observacao = carencias >= carenciasNecessarias ? string1 : string2;
    } else if (totalDiasAteLimite < minimoDiasNecessarios) {
        response.observacao = `Não possui o tempo mínimo de contribuição 
            de ${minimoDiasNecessarios / 360} anos até a data de 13/11/2019`;
    } else {
        let diasContribuidosAposLimite = totalDiasSemLimite - totalDiasAteLimite;
        let totalFaltanteComPedagio = (totalDiasNecessarios - totalDiasAteLimite) * 1.5;
        let totalFaltante: any = parseDias(totalFaltanteComPedagio - diasContribuidosAposLimite);

        response.observacao = `Continuar contribuindo por pelo menos mais ${totalFaltante.anos} anos, ${totalFaltante.meses} meses e ${totalFaltante.dias} dias.`;
    }

    return response;
};

const getTrabalhadoIsOk = (anosTrabalhados, genero) => {
    let requisitoTrabalhado;
    if (genero == "M") requisitoTrabalhado = 33;
    else requisitoTrabalhado = 28;

    if (anosTrabalhados >= requisitoTrabalhado) return true;
    return false;
};

