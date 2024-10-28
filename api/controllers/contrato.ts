import { Request, Response } from "express";
import { CadastroTemplate } from "../../app/contrato/CadastroTemplate";
import { ListaTemplates } from "../../app/contrato/ListaTemplates";
import { GetContratoById } from "../../app/contrato/GetContratoById";
import { EditarTemplate } from "../../app/contrato/EditarTemplate";
import { GerarContrato } from "../../app/contrato/GerarContrato";
import { DeleteOne } from "../../app/contrato/DeleteOne";

import { ContratoDatabaseRepository } from "./../../db/repositories/ContratoDatabaseRepository";
import { CustomerDatabaseRepository } from "../../db/repositories/CustomerDatabaseRepository";
import { ConfigsDatabaseRepository } from "../../db/repositories/ConfigsDatabaseRepository";
import { ContratoRepository } from "./../../db/contracts/ContratoRepository";

export const create = async (req: Request, res: Response): Promise<void> => {
    const contratoRepository = new ContratoDatabaseRepository();

    const cadastroTemplate = new CadastroTemplate(contratoRepository);
    const cadastro = cadastroTemplate.execute(req.body);

    res.send(cadastro);
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const contratoRepository = new ContratoDatabaseRepository();

    let id: number = +req.params.id as number;
    const update = new EditarTemplate(contratoRepository);
    let data = await update.execute(id, req.body);

    res.send(data);
};

export const list = async (req: Request, res: Response): Promise<void> => {
    const contratoRepository = new ContratoDatabaseRepository();

    const listaTemplates = new ListaTemplates(contratoRepository);

    const templates = await listaTemplates.execute();

    res.send(templates);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    const contratoRepository = new ContratoDatabaseRepository();
    const getContratoById = new GetContratoById(contratoRepository);

    let id: number = +req.params.id as number;

    const data = await getContratoById.execute(id);

    res.send(data);
};

export const geraContrato = async (req: Request, res: Response): Promise<void> => {
    const contratoRepository = new ContratoDatabaseRepository();
    const clienteRepository = new CustomerDatabaseRepository();
    const configRepository = new ConfigsDatabaseRepository();

    const gerarContrato = new GerarContrato(contratoRepository, clienteRepository, configRepository);

    let { idCliente, idContrato } = req.params;

    let contrato = await gerarContrato.execute(idCliente, idContrato);

    res.contentType("application/pdf");
    res.send(contrato);
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    const contratoRepository = new ContratoDatabaseRepository();
    const delOne = new DeleteOne(contratoRepository);

    let { idContrato } = req.params;

    const contratoDeletado = await delOne.execute(+idContrato);

    res.send("ok");
};
