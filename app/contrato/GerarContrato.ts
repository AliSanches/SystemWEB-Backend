import Handlebars from "handlebars";
import { ContratoRepository } from "./../../db/contracts/ContratoRepository";
import CustomerRepository from "../../db/contracts/CustomerRepository";
import ConfigsRepository from "../../db/contracts/ConfigsRepository";
import puppeteer from "puppeteer";

class GerarContrato {
    constructor(
        readonly contratoRepository: ContratoRepository,
        readonly clienteRepository: CustomerRepository,
        readonly configRepository: ConfigsRepository
    ) {}

    execute = async (idCliente, idContrato) => {
        let contrato = await this.contratoRepository.getById(+idContrato);
        let cliente = await this.clienteRepository.get(+idCliente);
        let config = await this.configRepository.get();

        let template = Handlebars.compile(contrato.texto);

        let compiled = template({ nome: cliente.name, empresa: config.empresa });

        const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
        const page = await browser.newPage();

        await page.setContent(compiled, { waitUntil: "domcontentloaded" });

        const pdf = await page.pdf({
            format: "A4",
            margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
        });

        await browser.close();

        return pdf;
    };
}

export { GerarContrato };
