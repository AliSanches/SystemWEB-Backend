import { checaSobreposicao } from "./ChecaSobreposicao";

export const tempoTotal = (employmentArray, gender) => {
	let tempoTotal = 0;

	for (let employment in employmentArray) {
		if (+employment != 0) {
			tempoTotal = tempoTotal + checaSobreposicao(employmentArray, employment, gender);
		} else {
			let inicioAtual: any = employmentArray[employment].startDate;
			let finalAtual: any = employmentArray[employment].endDate;

			let [inicioAnos, inicioMeses, inicioDias] = inicioAtual.split("-");
			let [finalAnos, finalMeses, finalDias] = finalAtual.split("-");

			const isLeapYear = (year) => {
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
			if (finalDias == 31) finalDias = 30;

			let dias = finalDias - inicioDias;
			let meses = finalMeses - inicioMeses;
			let anos = finalAnos - inicioAnos;

			if (employmentArray[employment].periodIsSpecial) {
				dias = dias + meses * 30 + anos * 360;
				if (gender == "M") dias = dias * 1.4;
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
			tempoTotal = tempoTotal + dias + meses * 30 + anos * 360;
		}
	}

	let meses = Math.floor(tempoTotal / 30);
	let dias = Math.floor(tempoTotal - meses * 30);
	let anos = Math.floor(meses / 12);
	meses = Math.floor(meses - anos * 12);

	return { years: anos, months: meses, days: dias };
};
