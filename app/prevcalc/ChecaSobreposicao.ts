import moment from "moment";
import { TEmployment } from "../../entities/Employment";

export const checaSobreposicao = (employmentArray: TEmployment[], employment, sexo) => {
	let anterior = employment - 1;
	let finalAnterior: any = moment(employmentArray[anterior].endDate, "YYYY-MM-DD");
	let inicioAtual: any = moment(employmentArray[employment].startDate, "YYYY-MM-DD");
	let finalAtual: any = moment(employmentArray[employment].endDate, "YYYY-MM-DD");

	if (inicioAtual.isBefore(finalAnterior)) {
		finalAnterior = finalAnterior.format("DD-MM-YYYY");
		inicioAtual = inicioAtual.format("DD-MM-YYYY");
		finalAtual = finalAtual.format("DD-MM-YYYY");

		let [anteriorDias, anteriorMeses, anteriorAnos] = finalAnterior.split("-");
		let [finalDias, finalMeses, finalAnos] = finalAtual.split("-");
		let [inicioDias, inicioMeses, inicioAnos] = inicioAtual.split("-");

		let diasSobrepostos = anteriorDias - inicioDias;
		let mesesSobrepostos = anteriorMeses - inicioMeses;
		let anosSobrepostos = anteriorAnos - inicioAnos;

		if (diasSobrepostos < 0) {
			diasSobrepostos = diasSobrepostos + 30;
			mesesSobrepostos = mesesSobrepostos - 1;
		}
		if (mesesSobrepostos < 0) {
			mesesSobrepostos = mesesSobrepostos + 12;
			anosSobrepostos = anosSobrepostos - 1;
		}

		let totalSobreposto = diasSobrepostos + mesesSobrepostos * 30 + anosSobrepostos * 360;

		let dias = finalDias - inicioDias;
		let meses = finalMeses - inicioMeses;
		let anos = finalAnos - inicioAnos;

		if (employmentArray[employment].periodIsSpecial) {
			dias = dias + meses * 30 + anos * 360;
			if (sexo == "M") dias = dias * 1.4;
			else dias = dias * 1.2;
			meses = 0;
			anos = 0;
		} else {
			dias = dias + meses * 30 + anos * 360;
		}

		if (dias < 0) {
			dias = dias + 30;
			meses = meses - 1;
		}
		if (meses < 0) {
			meses = meses + 12;
			anos = anos - 1;
		}

		let total = dias - totalSobreposto;
		if (total <= 0) return 0;
		else return total;
	} else {
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
		let total = dias + meses * 30 + anos * 360;

		if (employmentArray[employment].periodIsSpecial) {
			if (sexo == "M") total = Math.floor(total * 1.4);
			else total = Math.floor(total * 1.2);
		}
		return total;
	}
};
