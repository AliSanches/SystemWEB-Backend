var moment = require("moment");

class Prevcalc {
	tamanhoMes;
	formatoData;
	genero;
	getAnoMesDia;

	constructor() {
		this.getAnoMesDia = getAnoMesDia;
		this.parseAnoMesDia = parseAnoMesDia;
		this.parseDias = parseDias;
		this.getIdade = getIdade;
		this.getIdadeProgressiva = getIdadeProgressiva;
		this.getTempoFaltante = getTempoFaltante;
		this.calculaPedagio = calculaPedagio;
		this.tempoTotal = tempoTotal;
		this.calculaPeriodo = calculaPeriodo;
	}
}

module.exports = Prevcalc;

function getAnoMesDia(inicio, termino, especial, sexo) {
	let [diaInicio, mesInicio, anoInicio] = inicio.split("-");
	let [diaTermino, mesTermino, anoTermino] = termino.split("-");

	let anos = anoTermino - anoInicio;
	let meses = mesTermino - mesInicio;
	let dias = diaTermino - diaInicio;
	dias++;
	if (especial == "S" && sexo == "M") {
		dias = dias + meses * 30 + anos * 360;
		dias = Math.floor(dias + (dias / 100) * 40);
		meses = 0;
		anos = 0;
	}
	if (especial == "S" && sexo == "F") {
		dias = dias + meses * 30 + anos * 360;
		dias = Math.floor(dias + (dias / 100) * 20);
		meses = 0;
		anos = 0;
	}

	if (dias < 0) {
		dias = dias + 30;
		meses = meses - 1;
	}
	while (dias >= 30) {
		dias = dias - 30;
		meses = meses + 1;
	}
	while (meses >= 12) {
		meses = meses - 12;
		anos = anos + 1;
	}
	if (meses < 0) {
		meses = meses + 12;
		anos = anos - 1;
	}

	return [anos, meses, dias];
}

function parseAnoMesDia(anos, meses, dias) {
	meses = meses + Math.floor(dias / 30);
	anos = anos + Math.floor(meses / 12);
	dias = dias - Math.floor(dias / 30) * 30;
	meses = meses - Math.floor(meses / 12) * 12;

	return [anos, meses, dias];
}

function parseDias(d) {
	let meses = Math.floor(d / 30);
	let dias = Math.ceil(d - meses * 30);
	let anos = Math.floor(meses / 12);
	meses = meses - anos * 12;

	return { anos, meses, dias };
}

function getIdade(dataNascimento, data) {
	let nascimento = moment.utc(dataNascimento).format("DD-MM-YYYY");

	if (data === "hoje") var hoje = moment().format("DD-MM-YYYY");
	else {
		var hoje = data;
	}

	let [diaN, mesN, anoN] = nascimento.split("-");
	let [diaH, mesH, anoH] = hoje.split("-");

	let anos = anoH - anoN;
	let meses = mesH - mesN;
	let dias = diaH - diaN + 1;

	if (meses < 0) {
		meses = meses + 12;
		anos = anos - 1;
	}

	if (dias < 0) {
		dias = dias + 30;
		meses = meses - 1;
	}

	if (dias >= 30) {
		dias = 0;
		meses++;
	}

	if (meses < 0) {
		meses = meses + 12;
		anos = anos - 1;
	}

	return { anos, meses, dias };
}

function getIdadeProgressiva(inicioProgressiva, fimProgressiva) {
	if (moment().isBefore(fimProgressiva)) {
		var fatorProgressivo = moment().diff(inicioProgressiva, "years") + 1;
	} else {
		var fatorProgressivo = fimProgressiva.diff(inicioProgressiva, "years");
	}

	if (this.genero === "M") {
		var idadeNecessaria = 61 + fatorProgressivo * 0.5;
		var pontuacaoNecessaria = 96 + fatorProgressivo * 0.5;
	} else {
		var idadeNecessaria = 56 + fatorProgressivo * 0.5;
		var pontuacaoNecessaria = 86 + fatorProgressivo * 0.5;
	}

	return [idadeNecessaria, pontuacaoNecessaria];
}

function getTempoFaltante(contribNecessaria, diasContribuidos) {
	let diasFaltantes = contribNecessaria - diasContribuidos;
	let data1 = moment();
	let data2 = moment();

	data2.add(diasFaltantes, "days");

	let anos = data2.diff(data1, "years");
	data1.add(anos, "years");

	let meses = data2.diff(data1, "months");

	return { anos, meses };
}

function calculaPedagio(tempoTrabalhado, genero) {
	let tempo = parseDias(tempoTrabalhado);
	let anos = tempo.anos;
	let meses = tempo.meses;
	let dias = tempo.dias;
	let porcentagem = 0.4;
	let requisito;

	if (genero == "F") requisito = { A: 24, M: 11, D: 30 };
	if (genero == "M") requisito = { A: 29, M: 11, D: 30 };

	let a = (requisito.A - anos) * 360;
	let m = (requisito.M - meses) * 30;
	let d = requisito.D - dias;
	let totalDias = a + m + d;
	let floor1 = Math.floor(totalDias * porcentagem);
	let floor2 = Math.floor(floor1 / 360);
	let v1 = floor2 * 360;
	let v2 = floor1 - v1;
	let floor3 = Math.floor(v2 / 30);
	let v3 = floor3 * 30;
	let v4 = v2 - v3;

	//floor2=ano floor3=mes dia=v4
	anos = floor2;
	meses = floor3;
	dias = v4;

	return [anos, meses, dias];
}

function tempoTotal(cnisArray, sexo) {
	let tempoTotal = 0;

	cnisArray = cnisArray.map((cnis) => {
		let startDate = new Date(cnis.startDate).toISOString().split("T")[0];
		let endDate = new Date(cnis.endDate).toISOString().split("T")[0];

		return { ...cnis, startDate, endDate };
	});

	for (let cnis in cnisArray) {
		if (cnis != 0) {
			let tempoAnterior = tempoTotal;

			tempoTotal = tempoTotal + checaSobreposicao(cnisArray, cnis, sexo);
		} else {
			let inicioAtual = cnisArray[cnis].startDate;
			let finalAtual = cnisArray[cnis].endDate;

			let [inicioDias, inicioMeses, inicioAnos] = inicioAtual.split("-");
			let [finalDias, finalMeses, finalAnos] = finalAtual.split("-");

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

			if (cnisArray[cnis].periodIsSpecial) {
				dias = dias + meses * 30 + anos * 360;
				if (sexo == "M") dias = dias * 1.4;
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
	tempoTotal = tempoTotal + cnisArray.length;

	function checaSobreposicao(cnisArray, cnis, sexo) {
		let anterior = cnis - 1;
		let finalAnterior = moment(cnisArray[anterior].endDate, "DD-MM-YYYY");
		let inicioAtual = moment(cnisArray[cnis].startDate, "DD-MM-YYYY");
		let finalAtual = moment(cnisArray[cnis].endDate, "DD-MM-YYYY");

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

			if (cnisArray[cnis].periodIsSpecial) {
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

			if (cnisArray[cnis].periodIsSpecial) {
				if (sexo == "M") total = Math.floor(total * 1.4);
				else total = Math.floor(total * 1.2);
			}
			return total;
		}
	}

	let meses = Math.floor(tempoTotal / 30);
	let dias = Math.floor(tempoTotal - meses * 30);
	let anos = Math.floor(meses / 12);
	meses = Math.floor(meses - anos * 12);

	return { anos, meses, dias };
}

function calculaPeriodo(inicio, termino) {
	let [diaInicio, mesInicio, anoInicio] = inicio.split("-");
	let [diaTermino, mesTermino, anoTermino] = termino.split("-");

	let dias = diaTermino - diaInicio;
	let meses = mesTermino - mesInicio;
	let anos = anoTermino - anoInicio;

	let ultimoDia = 0;
	switch (mesTermino) {
		case "01":
			ultimoDia = 31;
			break;
		case "03":
			ultimoDia = 31;
			break;
		case "04":
			ultimoDia = 30;
			break;
		case "05":
			ultimoDia = 31;
			break;
		case "06":
			ultimoDia = 30;
			break;
		case "07":
			ultimoDia = 31;
			break;
		case "08":
			ultimoDia = 31;
			break;
		case "09":
			ultimoDia = 30;
			break;
		case "10":
			ultimoDia = 31;
			break;
		case "11":
			ultimoDia = 30;
			break;
		case "12":
			ultimoDia = 31;
			break;
	}

	//GAMBIARRA NÃO TOCAR AQUI
	if (diaTermino == 28 && mesTermino == 2) {
		dias = dias + 3;
	}
	if (mesTermino == mesInicio && anoTermino == anoInicio) {
		if (diaInicio == 1 && diaTermino == ultimoDia) {
			dias = 0;
			meses = meses + 1;
		}
	}
	if (diaInicio == 1 && diaTermino == 1) {
		if (dias == 0) dias = 1;
	}
	//FIM DA GAMBIARRA

	if (dias < 0) {
		dias = dias + 30;
		meses = meses - 1;
	}
	if (dias == 30) {
		dias = 0;
		meses = meses + 1;
	}
	if (meses < 0) {
		meses = meses + 12;
		anos = anos - 1;
	}
	if (meses == 12) {
		meses = 0;
		anos = anos + 1;
	}

	return { anos, meses, dias };
}

