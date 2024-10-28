import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import { CalculaIdade } from "./CalculaIdade";
import { getContribuicaoTotal } from "./prevcalc2";
import { LimitaDataCnis } from "./LimitaDataCnis";
import { parseDias } from "./ParseDias";
import { CalculaCarencias } from "./CalculaCarencias";

export const getTransicao100 = async (customerId) => {
    const repository = new EmploymentDatabaseRepository();
    let cnisArray: any = await repository.list(+customerId);
    if (cnisArray.length <= 0) return false;

    let cliente = cnisArray[0].customer;
    let idade = CalculaIdade.execute(cliente);
    let idadeEmDias = idade.anos * 360 + idade.meses * 30 + idade.dias;
    let carenciasNecessarias = 180;
    let requisitoIdade = cliente.gender === "M" ? "60" : "57";

    if (cliente.gender === "M") {
        var totalDiasNecessarios = 12600;
        var idadeNecessaria = 21600;
    } else {
        var totalDiasNecessarios = 10800;
        var idadeNecessaria = 20520;
    }

    cnisArray.sort(comparar);
    function comparar(a, b) {
        let inicioA = new Date(a.startDate);
        let inicioB = new Date(b.startDate);

        if (inicioA < inicioB) return -1;
        else if (inicioA < inicioB) return 1;
        return 0;
    }

    let cnisAteReforma19 = LimitaDataCnis.execute(cnisArray, "2019-11-13");
    let [anosContribAte19, mesesContribAte19, diasContribAte19] = getContribuicaoTotal(
        cnisAteReforma19,
        cliente.gender
    );
    let totalDiasContribAte19 = anosContribAte19 * 360 + mesesContribAte19 * 30 + diasContribAte19;
    let [anosContribTotais, mesesContribTotais, diasContribTotais] = getContribuicaoTotal(cnisArray, cliente.gender);
    let totalDiasTrabalhados = anosContribTotais * 360 + mesesContribTotais * 30 + diasContribTotais;
    let diasFaltantesComPedagio = (totalDiasNecessarios - totalDiasContribAte19) * 2;
    let faltanteComPedagio = parseDias(diasFaltantesComPedagio);
    let totalNecessarioComPedagio = totalDiasContribAte19 + diasFaltantesComPedagio;
    let carencias = CalculaCarencias.execute(cnisArray);
    let faltanteFinal = totalNecessarioComPedagio - totalDiasTrabalhados;

    let response = {
        idade: { ...idade, isOk: getIdadeIsOk(idade.anos, cliente.gender) },
        trabalhado: { anosContribAte19, mesesContribAte19, diasContribAte19, isOk: false },
        faltante: parseDias(idadeNecessaria - idadeEmDias),
        pedagio: parseDias(totalDiasNecessarios - totalDiasContribAte19),
        faltanteComPedagio,
        carencias: { value: carencias, isOk: carencias >= 180 ? true : false },
        contribuidoApos19: parseDias(totalDiasTrabalhados - totalDiasContribAte19),
        observacao: "Beneficiário apto a aposentadoria pela Transição de 100%.",
    };

    if (totalDiasTrabalhados < totalNecessarioComPedagio) {
        let faltante = parseDias(faltanteFinal);
        response.observacao = `Contribuir por mais ${faltante.anos} anos ${faltante.meses} meses e ${faltante.dias} dias`;
    } else if (idadeEmDias < idadeNecessaria) {
        response.observacao = `Beneficiário não possui a idade mínima de ${requisitoIdade} anos.`;
    } else if (carencias < carenciasNecessarias) {
        response.observacao = `Requisito de 180 carências não atendido.`;
    }

    return response;
};

const getIdadeIsOk = (idadeAnos, genero) => {
    let requisitoIdade;

    if (genero == "M") requisitoIdade = 60;
    else requisitoIdade = 57;

    if (idadeAnos >= requisitoIdade) return true;
    return false;
};

