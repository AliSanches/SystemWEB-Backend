export class CalculaCarencias {
    static execute = (cnisArray) => {
        let mesesContados: string[] = [];

        cnisArray.forEach((employment) => {
            let start = employment.startDate.toISOString().split("T")[0];
            let end = employment.endDate.toISOString().split("T")[0];

            let [startYear, startMonth, startDay] = start.split("-");
            let [endYear, endMonth, endDay] = end.split("-");

            let monthsInThePeriod = this.iteraCarencias(+startMonth, +startYear, +endMonth, +endYear);

            if (employment.considerGracePeriod) {
                monthsInThePeriod.forEach((month) => {
                    if (!mesesContados.includes(month)) {
                        mesesContados.push(month);
                    }
                });
            }
        });

        return mesesContados.length;
    };

    static iteraCarencias = (mesInicio: number, anoInicio: number, mesTermino: number, anoTermino: number) => {
        let contados: string[] = [];
        let ano = anoInicio;
        let mes = mesInicio;

        while (ano < anoTermino) {
            if (mes < 12) {
                contados.push(`${mes}/${ano}`);
                mes = mes + 1;
            } else {
                contados.push(`${mes}/${ano}`);
                mes = 1;
                ano = ano + 1;
            }
        }
        if (ano == anoTermino) {
            while (mes < mesTermino) {
                contados.push(`${mes}/${ano}`);
                mes = mes + 1;
            }
            if (mes == mesTermino) {
                contados.push(`${mes}/${ano}`);
            }
        }
        return contados;
    };
}

