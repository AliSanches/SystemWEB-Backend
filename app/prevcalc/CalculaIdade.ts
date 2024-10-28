export class CalculaIdade {
    static execute = (cliente, data = new Date().toISOString().split("T")[0]) => {
        let dataNascimento = cliente.birthdate.toISOString().split("T")[0];

        let [nascimentoAno, nascimentoMes, nascimentoDia] = dataNascimento.split("-");
        let [dataAno, dataMes, dataDia]: string[] = data.split("-");

        let anos = +dataAno - nascimentoAno;
        let meses = +dataMes - nascimentoMes;
        let dias = +dataDia - nascimentoDia;

        while (meses < 0) {
            meses = meses + 12;
            anos--;
        }
        while (dias < 0) {
            dias = dias + 30;
            meses--;
        }

        return { anos, meses, dias };
    };
}

