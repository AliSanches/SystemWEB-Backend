export class LimitaDataCnis {
    static execute = (cnisArray, dataLimite: string) => {
        let arrayLimitado: any[] = [];

        cnisArray.map((cnis) => {
            let dataInicial = new Date(cnis.startDate);
            let dataFinal = new Date(cnis.endDate);

            let limite = new Date(dataLimite);

            if (dataInicial < limite && dataFinal < limite) arrayLimitado.push(cnis);
            if (dataInicial < limite && dataFinal >= limite) arrayLimitado.push({ ...cnis, endDate: limite });
        });

        return arrayLimitado;
    };
}

