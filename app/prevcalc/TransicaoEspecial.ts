import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import { CalculaIdade } from "./CalculaIdade";
import { LimitaDataCnis } from "./LimitaDataCnis";
import { getContribuicaoTotal } from "./prevcalc2";

export const getTransicaoEspecial = async (customerId) => {
    const repository = new EmploymentDatabaseRepository();
    let cnisArray: any = await repository.list(+customerId);
    if (cnisArray.length <= 0) return false;
    let cliente = cnisArray[0].customer;
    let idade = CalculaIdade.execute(cliente);
    let hojeAno = new Date().getFullYear();

    let requisitoContribuicaoAnos = 25;
    let requisitoPontos = 86;
    //requisito de pontos em caso de risco baixo é 86.
    //requisito de contribuicao especial em caso de risco baixo é de 25 anos.
    //considerando aqui que a contribuição seja risco baixo, por isso fixo aqui.

    cnisArray.sort(comparar);
    function comparar(a, b) {
        let inicioA = new Date(a.startDate);
        let inicioB = new Date(b.startDate);
        if (inicioA < inicioB) return -1;
        else if (inicioA < inicioB) return 1;
        return 0;
    }
    let cnisEspecial = cnisArray.filter((item) => item.periodIsSpecial);
    let cnisNormal = LimitaDataCnis.execute(cnisArray, "2024-09-17");
    let [contribAnos, contribMeses, contribDias] = getContribuicaoTotal(cnisNormal, cliente.gender);
    let [anosEspeciais, mesesEspeciais, diasEspeciais] = getContribuicaoTotal(cnisEspecial, cliente.gender);

    let pontos = contribAnos + idade.anos;

    return {
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
            isOk: false,
        },
        atividadeEspecial: {
            anos: anosEspeciais,
            meses: mesesEspeciais,
            dias: diasEspeciais,
            isOk: anosEspeciais >= requisitoContribuicaoAnos,
        },
    };
};

