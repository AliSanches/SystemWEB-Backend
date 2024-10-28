import moment from "moment";
import { TEmployment } from "../../entities/Employment";
import { TCustomer } from "../../entities/Customer";

export const ordenaCnis = (cnisArray) => {
    const compare = (a, b) => {
        let inicioA = moment(a.startDate, "DD-MM-YYYY");
        let inicioB = moment(b.startDate, "DD-MM-YYYY");

        if (inicioA.isBefore(inicioB)) return -1;
        if (inicioA.isAfter(inicioB)) return 1;

        return 0;
    };

    cnisArray.sort(compare);

    return cnisArray;
};

export const getFatorPrevidenciario = (idadeAnos, contribAnos) => {
    let TC = contribAnos;
    let idade = idadeAnos;
    let sobrevida = getSobrevida(idade);
    let aliquota = 0.31;

    let valor1 = (TC * aliquota) / sobrevida;
    let valor2 = (TC * aliquota + idade) / 100 + 1;

    return (valor1 * valor2).toFixed(3);
};

export function getSobrevida(idadeAnos) {
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

export const getDuracaoCnis = (cnis) => {
    let inicio = cnis.startDate;
    let termino = cnis.endDate;

    let [inicioAnos, inicioMeses, inicioDias] = inicio.split("-");
    let [finalAnos, finalMeses, finalDias] = termino.split("-");

    let dias = finalDias - inicioDias + 1;
    let meses = finalMeses - inicioMeses;
    let anos = finalAnos - inicioAnos;

    if (cnis.periodIsSpecial) {
        dias = dias + meses * 30 + anos * 360;
        if (cnis.customer.gender == "M") dias = dias * 1.4;
        else dias = dias * 1.2;
        meses = 0;
        anos = 0;
    }

    while (dias >= 30) {
        dias = dias - 30;
        meses = meses + 1;
    }
    while (meses >= 12) {
        meses = meses - 12;
        anos = anos + 1;
    }

    if (dias < 0) {
        dias = dias + 30;
        meses = meses - 1;
    }

    if (meses < 0) {
        meses = meses + 12;
        anos = anos - 1;
    }

    cnis.durationYears = anos;
    cnis.durationMonths = meses;
    cnis.durationDays = Math.floor(dias);

    return cnis;
};

export const getContribuicaoTotal = (employmentArray, gender): [anos: number, meses: number, dias: number] => {
    let tempoTotal = 0;

    employmentArray = employmentArray.map((cnis) => {
        let startDate = new Date(cnis.startDate).toISOString().split("T")[0];
        let endDate = new Date(cnis.endDate).toISOString().split("T")[0];

        return { ...cnis, startDate, endDate };
    });

    for (let employment in employmentArray) {
        if (+employment != 0) {
            let inicio = employmentArray[employment].startDate;
            let termino = employmentArray[employment].endDate;

            let tempoCnis = checaSobreposicao(employmentArray, employment, gender);

            tempoTotal = tempoTotal + tempoCnis;
        } else {
            let inicioAtual: any = employmentArray[employment].startDate;
            let finalAtual: any = employmentArray[employment].endDate;

            let [inicioAnos, inicioMeses, inicioDias] = inicioAtual.split("-");
            let [finalAnos, finalMeses, finalDias] = finalAtual.split("-");

            /*const isLeapYear = (year) => {
                    if (year % 4 == 0) {
                        if (year % 100 == 0) {
                            if (year % 400 == 0) return true;
                        } else return true;
                    } else return false;
                };

                if (inicioMeses == 2 && (inicioDias == 28 || inicioDias == 29)) {
                    if (isLeapYear(inicioAnos) && inicioDias == 29) inicioDias = 30;
                    if (!isLeapYear(inicioAnos) && inicioDias == 28) inicioDias = 30;
                    if (isLeapYear(inicioAnos) && inicioDias == 28) inicioDias = 29;
                }
                if (finalMeses == 2 && (finalDias == 28 || finalDias == 29)) finalDias = 30;
                if (inicioDias == 31) inicioDias = 30;
                if (finalDias == 31) finalDias = 30;*/

            let dias = finalDias - inicioDias;
            let meses = finalMeses - inicioMeses;
            let anos = finalAnos - inicioAnos;

            if (employmentArray[employment].periodIsSpecial) {
                //adicionado 1 ao final, pois o dia em que o beneficiario iniciou no trabalho, tambem deve ser contado
                dias = Math.floor(dias + meses * 30 + anos * 360 + 1);

                if (gender == "M") dias = Math.floor(dias * 1.4);
                else dias = Math.floor(dias * 1.2);
                meses = 0;
                anos = 0;
            }

            while (dias >= 30) {
                dias = dias - 30;
                meses = meses + 1;
            }
            while (meses >= 12) {
                meses = meses - 12;
                anos = anos + 1;
            }

            if (dias < 0) {
                dias = dias + 30;
                meses = meses - 1;
            }

            if (meses < 0) {
                meses = meses + 12;
                anos = anos - 1;
            }

            tempoTotal = tempoTotal + dias + meses * 30 + anos * 360;

            //adicionado 1, pois o dia em que o beneficiario iniciou no trabalho, tambem deve ser contado
            if (!employmentArray[employment].periodIsSpecial) tempoTotal++;
        }
    }

    let meses = Math.floor(tempoTotal / 30);
    let dias = Math.floor(tempoTotal - meses * 30);
    let anos = Math.floor(meses / 12);
    meses = Math.floor(meses - anos * 12);

    return [anos, meses, dias];
};

const checaSobreposicao = (employmentArray: TEmployment[], employment, sexo) => {
    let anterior = employment - 1;
    let finalAnterior: any = moment(employmentArray[anterior].endDate, "YYYY-MM-DD");
    let inicioAtual: any = moment(employmentArray[employment].startDate, "YYYY-MM-DD");
    let finalAtual: any = moment(employmentArray[employment].endDate, "YYYY-MM-DD");

    let cnisAnteriores: any[] = [];

    for (let index in employmentArray) {
        if (index < employment) cnisAnteriores.push(employmentArray[index]);
    }

    for (let cnis in cnisAnteriores) {
        let final = moment(cnisAnteriores[cnis].endDate, "YYYY-MM-DD");

        if (inicioAtual.isBefore(final)) return 0;
    }

    inicioAtual = inicioAtual.format("DD-MM-YYYY");
    finalAtual = finalAtual.format("DD-MM-YYYY");

    let [inicioDias, inicioMeses, inicioAnos] = inicioAtual.split("-");
    let [finalDias, finalMeses, finalAnos] = finalAtual.split("-");

    let dias = finalDias - inicioDias;
    let meses = finalMeses - inicioMeses;
    let anos = finalAnos - inicioAnos;

    if (dias < 0) {
        dias = dias + 30;
        meses = meses - 1;
    }

    if (meses < 0) {
        meses = meses + 12;
        anos = anos - 1;
    }

    //adicionado 1, pois o dia em que o beneficiario iniciou no trabalho, tambem deve ser contado
    let total = dias + meses * 30 + anos * 360 + 1;

    if (employmentArray[employment].periodIsSpecial) {
        if (sexo == "M") total = Math.floor(total * 1.4);
        else total = Math.floor(total * 1.2);
    }

    return total;
};

export const formataData = (cnis) => {
    cnis = cnis.map((employment) => {
        let start = employment.startDate.toISOString().split("T")[0];
        let end = employment.endDate.toISOString().split("T")[0];

        return { ...employment, startDate: start, endDate: end };
    });

    return cnis;
};

export const getIdade = (cliente) => {
    let dataNascimento = cliente.birthdate.toISOString().split("T")[0];
    let hoje = new Date().toISOString().split("T")[0];

    let [nascimentoAno, nascimentoMes, nascimentoDia] = dataNascimento.split("-");
    let [hojeAno, hojeMes, hojeDia]: string[] = hoje.split("-");

    let anos = +hojeAno - nascimentoAno;
    let meses = +hojeMes - nascimentoMes;
    let dias = +hojeDia - nascimentoDia;

    while (meses < 0) {
        meses = meses + 12;
        anos--;
    }
    while (dias < 0) {
        dias = dias + 30;
        meses--;
    }

    return [anos, meses, dias];
};

