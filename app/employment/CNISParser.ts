import PDFParser from "pdf2json";

export class CNISParser {
    static parse = async (pdfBuffer) => {
        let pdfParser = new PDFParser();
        let rawParsedPDF = await new Promise((resolve, reject) => {
            pdfParser.parseBuffer(pdfBuffer);
            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                resolve(pdfData);
            });
            pdfParser.on("pdfParser_dataError", () => reject());
        });

        let texts = this.getOnlyTexts(rawParsedPDF);
        let lines = this.getLines(texts);
        let cnisArray = lines.map((line) => this.parseCnisFromLine(line));

        let filteredArray: any[] = [];
        cnisArray.forEach((cnis) => {
            if (cnis != undefined) filteredArray.push(cnis);
        });

        return filteredArray;
    };

    static getOnlyTexts = (data) => {
        let page1 = data.Pages[0];
        let texts = page1.Texts.map((text) => text.R[0].T);
        texts = texts.map((text) => decodeURIComponent(text));
        texts = texts.splice(texts.indexOf("Seq."));
        return texts;
    };

    static getLines = (texts) => {
        let lines: any[] = [];
        let lineCount = 0;
        let lineStartIndexes: any[] = [];
        let parsedLines = 0;

        for (let index in texts) {
            let text = texts[index];

            if (text >= 1 && text <= 100) {
                lineCount++;
                lineStartIndexes.push(index);
            }
        }

        while (parsedLines < lineCount) {
            let line = texts.slice(lineStartIndexes[parsedLines], lineStartIndexes[parsedLines + 1]);
            lines.push(line);
            parsedLines++;
        }

        return lines;
    };

    static parseCnisFromLine = (line) => {
        let dates: any[] = [];
        //let nit = line[1];

        //let codigo_empresa = "";
        let nome_empresa: string;

        //identifica se o segundo item é um número, se for é o código, se não for, está em branco e o 2 será o nome da empresa
        const isNumber = line[2].match(/\d+/g);
        if (isNumber) {
            //codigo_empresa = line[2];
            nome_empresa = line[3];
        } else {
            nome_empresa = line[2];
        }

        //identifica as datas
        for (let i in line) {
            let isDate = line[i].match(/\d{2}\/\d{2}\/\d{4}/g);
            if (isDate) {
                dates.push(isDate[0]);
            }
        }

        if (dates.length > 1)
            return {
                startDate: this.formatDate(dates[0]),
                endDate: this.formatDate(dates[1]),
                position: "",
                company: nome_empresa,
            };
    };

    static formatDate = (date) => {
        let [day, month, year] = date.split("/");
        return new Date(`${year}-${month}-${day}`);
    };
}
