import Prevcalc from "./prevcalc";
import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import moment from "moment";
import { CalculaIdade } from "./CalculaIdade";
import { LimitaDataCnis } from "./LimitaDataCnis";
import { getContribuicaoTotal } from "./prevcalc2";

export const getRegraPontos = async (customerId) => {
    const repository = new EmploymentDatabaseRepository();
    let cnisArray: any = await repository.list(+customerId);
    if (cnisArray.length <= 0) return false;
    let cliente = cnisArray[0].customer;
    let idade = CalculaIdade.execute(cliente);
    let hojeAno = new Date().getFullYear();

    let requisitoContribuicao;
    let requisitoPontos;

    if (cliente.gender == "M") {
        requisitoContribuicao = 35;
        requisitoPontos = 96 + hojeAno - 2019;
        if (requisitoPontos > 105) requisitoPontos = 105;
    } else {
        requisitoContribuicao = 30;
        requisitoPontos = 86 + hojeAno - 2019;
        if (requisitoPontos > 100) requisitoPontos = 100;
    }

    cnisArray.sort(comparar);
    function comparar(a, b) {
        let inicioA = new Date(a.startDate);
        let inicioB = new Date(b.startDate);
        if (inicioA < inicioB) return -1;
        else if (inicioA < inicioB) return 1;
        return 0;
    }
    let cnisNormal = LimitaDataCnis.execute(cnisArray, "2024-09-17");
    let [contribAnos, contribMeses, contribDias] = getContribuicaoTotal(cnisNormal, cliente.gender);

    let pontos = contribAnos + idade.anos;

    return {
        requisitoContribuicao,
        requisitoPontos,
        idade,
        pontos: {
            value: pontos,
            isOk: pontos >= requisitoPontos ? true : false,
        },
        contribuicao: {
            anos: contribAnos,
            meses: contribMeses,
            dias: contribDias,
            isOk: contribAnos >= requisitoContribuicao ? true : false,
        },
    };
};

