import { headerTemplate, footerTemplate } from "./HeaderFooterTemplate";
import CustomerRepository from "./../../db/contracts/CustomerRepository";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs";

export class RelatorioClientes {
    constructor(readonly repository: CustomerRepository) {}

    execute = async () => {
        let [, contagem] = await this.repository.list("", 0);
        let [clientes] = await this.repository.list("", contagem);

        clientes = clientes.map((cliente) => {
            let birthdate: Date | string = cliente.birthdate as Date;
            birthdate = birthdate.toLocaleDateString("pt-BR", { timeZone: "utc" });

            let gender = cliente.gender == "M" ? "Masculino" : "Feminino";

            return { ...cliente, birthdate, gender };
        });

        const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
        const page = await browser.newPage();

        let html = fs.readFileSync("app/relatorios/relatorioClienteNovo.html", "utf-8");
        const template = Handlebars.compile(html);

        let data = template(clientes);

        await page.setContent(data, {
            waitUntil: "load",
        });
        await page.emulateMediaType("screen");

        const pdf = await page.pdf({
            margin: { top: "100px", right: "0", bottom: "60px", left: "0" },
            format: "A4",
            printBackground: true,
            headerTemplate: headerTemplate,
            footerTemplate: footerTemplate,
            displayHeaderFooter: true,
        });

        return pdf;
    };
}

