import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import { getContribuicaoTotal, ordenaCnis } from "./prevcalc2";
import { CalculaIdade } from "./CalculaIdade";
import { parseDias } from "./ParseDias";
import { LimitaDataCnis } from "./LimitaDataCnis";
import { CalculaCarencias } from "./CalculaCarencias";

const requisitoCarencias = 180;

export const getIdadeProgressiva = async (customerId) => {
    const repository = new EmploymentDatabaseRepository();
    let cnisArray: any = await repository.list(+customerId);
    if (cnisArray.length <= 0) return false;
    let cliente = cnisArray[0].customer;
    let idade = CalculaIdade.execute(cliente);

    cnisArray.sort(comparar);
    function comparar(a, b) {
        let inicioA = new Date(a.startDate);
        let inicioB = new Date(b.startDate);
        if (inicioA < inicioB) return -1;
        else if (inicioA < inicioB) return 1;
        return 0;
    }

    let cnisLimitado = LimitaDataCnis.execute(cnisArray, "2019-11-13");
    let cnisNormal = LimitaDataCnis.execute(cnisArray, "2024-09-17");
    let [contrib19Anos, contrib19Meses, contrib19Dias] = getContribuicaoTotal(cnisLimitado, cliente.gender);
    let [contribAnos, contribMeses, contribDias] = getContribuicaoTotal(cnisNormal, cliente.gender);

    let requisitoContribuicao = cliente.gender == "M" ? 35 : 30;
    let contribIsOk = contribAnos >= requisitoContribuicao ? true : false;

    let idadeIsOk = false;

    let requisitoIdade = getRequisitoIdade(cliente.gender);
    if (idade.anos == requisitoIdade.anos && idade.meses >= requisitoIdade.meses) idadeIsOk = true;
    if (idade.anos > requisitoIdade.anos) idadeIsOk = true;

    return {
        idade: { ...idade, isOk: idadeIsOk },
        contribuidoAte2019: {
            anos: contrib19Anos,
            meses: contrib19Meses,
            dias: contrib19Dias,
            isOk: contrib19Anos + contrib19Meses + contrib19Dias >= 1 ? true : false,
        },
        contribuicaoTotal: { anos: contribAnos, meses: contribMeses, dias: contribDias, isOk: contribIsOk },
        carencias: {
            valor: CalculaCarencias.execute(cnisArray),
            isOk: CalculaCarencias.execute(cnisArray) >= requisitoCarencias ? true : false,
        },
        requisitoIdade,
        fatorPrevidenciario: getFatorPrevidenciario(idade.anos, contribAnos),
    };
};

const getRequisitoIdade = (gender = "M") => {
    let hoje = new Date();
    let hojeAno = hoje.getFullYear();
    let requisitoIdadeEm2019 = 61;

    if (gender === "M") {
        requisitoIdadeEm2019 = 61;
        if (hojeAno >= 2027) hojeAno = 2027;
    } else {
        requisitoIdadeEm2019 = 56;
        if (hojeAno >= 2031) hojeAno = 2031;
    }

    let requisitoIdadeProgressiva = (hojeAno - 2019) * 0.5;
    requisitoIdadeProgressiva = requisitoIdadeEm2019 + requisitoIdadeProgressiva;

    let [requisitoAnos, requisitoMeses] = `${requisitoIdadeProgressiva}`.split(".");
    requisitoMeses = requisitoMeses ? "6" : "0";

    return { anos: +requisitoAnos, meses: +requisitoMeses };
};

const getFatorPrevidenciario = (idadeAnos, contribAnos) => {
    let TC = contribAnos;
    let idade = idadeAnos;
    let sobrevida = getSobrevida(idade);
    let aliquota = 0.31;

    let valor1 = (TC * aliquota) / sobrevida;
    let valor2 = (TC * aliquota + idade) / 100 + 1;

    return (valor1 * valor2).toFixed(3);
};

function getSobrevida(idadeAnos) {
    const values = [
        75.5, 75.4, 74.5, 73.6, 72.6, 71.6, 70.6, 69.7, 68.7, 67.7, 66.7, 65.7, 64.7, 63.7, 62.8, 61.8, 60.8, 59.9,
        58.9, 58.0, 57.1, 56.2, 55.3, 54.4, 53.5, 52.6, 51.6, 50.7, 49.8, 48.9, 48.0, 47.1, 46.2, 45.3, 44.3, 43.4,
        42.5, 41.6, 40.7, 39.8, 38.9, 38.0, 37.1, 36.2, 35.3, 34.4, 33.5, 32.7, 31.8, 30.9, 30.1, 29.2, 28.4, 27.5,
        26.7, 25.9, 25.1, 24.3, 23.5, 22.7, 21.9, 21.1, 20.4, 19.6, 18.9, 18.1, 17.4, 16.7, 16.0, 15.4, 14.7, 14.0,
        13.4, 12.8, 12.2, 11.6, 11.0, 10.4, 9.9, 9.4, 8.8, 8.3, 7.9, 7.4, 7.0, 6.6, 6.2, 5.9, 5.6, 5.3, 5.1,
    ];

    if (idadeAnos >= 0 && idadeAnos < values.length) {
        return values[idadeAnos];
    } else if (idadeAnos >= 90) {
        return 5.1;
    } else {
        return 0;
    }
}

