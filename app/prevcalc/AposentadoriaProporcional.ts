import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import { LimitaDataCnis } from "./LimitaDataCnis";
import { getContribuicaoTotal, getFatorPrevidenciario } from "./prevcalc2";
import { parseDias } from "./ParseDias";
import { CalculaIdade } from "./CalculaIdade";
import { CalculaCarencias } from "./CalculaCarencias";

export const getAposentadoriaProporcional = async (customerId) => {
    const repository = new EmploymentDatabaseRepository();
    const cnisArray = await repository.list(+customerId);
    let cliente = cnisArray[0].customer;

    if (cnisArray.length <= 0) return false;

    let dataReforma = "1998-12-15";
    let dataReforma19 = "2019-11-13";

    let totalDiasNecessarios = cliente!.gender === "M" ? 10800 : 9000;
    let idadeNecessaria = cliente!.gender === "M" ? 19080 : 17280;

    let idadeEm19 = CalculaIdade.execute(cnisArray[0].customer, dataReforma19);
    let diasDeIdadeEm19 = idadeEm19.anos * 360 + idadeEm19.meses * 30 + idadeEm19.dias;

    //ordena baseado na data
    cnisArray.sort(comparar);
    function comparar(a, b) {
        let inicioA = new Date(a.startDate);
        let inicioB = new Date(b.startDate);

        if (inicioA < inicioB) return -1;
        if (inicioA > inicioB) return 1;
        return 0;
    }
    let cnisLimitado = LimitaDataCnis.execute(cnisArray, dataReforma);

    let [anosContribAte98, mesesContribAte98, diasContribAte98] = getContribuicaoTotal(cnisLimitado, cliente!.gender);
    let totalContribAte98 = anosContribAte98 * 360 + mesesContribAte98 * 30 + diasContribAte98;

    let contribFaltanteEm98 = parseDias(totalDiasNecessarios - totalContribAte98);

    cnisLimitado = LimitaDataCnis.execute(cnisArray, dataReforma19);

    let [anosContribAte19, mesesContribAte19, diasContribAte19] = getContribuicaoTotal(cnisLimitado, cliente!.gender);
    let totalContribAte19 = anosContribAte19 * 360 + mesesContribAte19 * 30 + diasContribAte19;

    let pedagio = calculaPedagio(totalContribAte98, cliente!.gender);
    let totalDiasPedagio = pedagio.anos * 360 + pedagio.meses * 30 + pedagio.dias;

    let totalNecessarioComPedagio = parseDias(totalDiasPedagio + totalDiasNecessarios);
    let carencias = CalculaCarencias.execute(cnisLimitado);
    let requisitoCarencias = 180;

    let response: any = {
        trabalhadoAte98: {
            anos: anosContribAte98,
            meses: mesesContribAte98,
            dias: diasContribAte98,
            isOk: anosContribAte98 + mesesContribAte98 + diasContribAte98 >= 1 ? true : false,
        },
        faltante: contribFaltanteEm98,
        pedagio: totalContribAte98 > 0 ? pedagio : { anos: 0, meses: 0, dias: 0 },
        totalNecessario: totalNecessarioComPedagio,
        trabalhadoAte19: { anos: anosContribAte19, meses: mesesContribAte19, dias: diasContribAte19 },
        idadeEm19: { ...idadeEm19, isOk: idadeEm19IsOk(idadeEm19, cliente!.gender) },
        observacao: "",
        carencias: { valor: carencias, isOk: carencias >= requisitoCarencias ? true : false },
        fatorPrevidenciario: getFatorPrevidenciario(idadeEm19.anos, anosContribAte19),
    };

    if (totalContribAte98 <= 0)
        response.observacao = "Não se enquadra pois não possui contribuição anterior a 16/12/1998";
    else if (totalContribAte98 >= totalDiasNecessarios)
        response.observacao = "Beneficiário apto a aposentadoria proporcional.";
    else if (totalContribAte19 >= totalDiasPedagio + totalDiasNecessarios && diasDeIdadeEm19 >= idadeNecessaria)
        response.observacao = "Beneficiário apto a aposentadoria proporcional.";
    else if (totalContribAte19 >= totalDiasPedagio + totalDiasNecessarios && diasDeIdadeEm19 < idadeNecessaria)
        response.observacao = `Não atende ao requisito de idade de ${
            parseDias(idadeNecessaria).anos
        } anos até a data da reforma de 13/11/2019.`;
    else if (totalContribAte19 < totalDiasPedagio + totalDiasNecessarios && diasDeIdadeEm19 >= idadeNecessaria)
        response.observacao = "Não possui o tempo de contribuição necessário até a reforma de 13/11/2019.";
    else if (totalContribAte19 < totalDiasPedagio + totalDiasNecessarios && diasDeIdadeEm19 < idadeNecessaria)
        response.observacao = `Não atende aos requisitos de contribuição e idade (${
            parseDias(idadeNecessaria).anos
        } anos) até a reforma de 13/11/2019.`;

    return response;
};

let idadeEm19IsOk = (idade, genero) => {
    let requisitoIdade = genero == "M" ? 53 : 48;

    if (idade.anos > requisitoIdade) return true;
    return false;
};

const calculaPedagio = (contribAte98, genero) => {
    //30 anos para homem, 25 para mulher
    let contribNecessaria = genero == "M" ? 10800 : 9000;
    let contribFaltante = contribNecessaria - contribAte98;

    let pedagio = parseDias(contribFaltante * 1.4);
    return pedagio;
};

