import { Request, Response } from "express";
import { RelatorioClientes } from "./../../app/relatorios/RelatorioClientes";
import { CustomerDatabaseRepository } from "../../db/repositories/CustomerDatabaseRepository";
import { UserDatabaseRepository } from "../../db/repositories/UserDatabaseRepository";
import { ProcessDatabaseRepository } from "../../db/repositories/ProcessDatabaseRepository";

export const listagemClientes = async (req: Request, res: Response) => {
    const clienteRepository = new CustomerDatabaseRepository();
    const relatorioClientes = new RelatorioClientes(clienteRepository);

    const relatorio = await relatorioClientes.execute();

    res.contentType("application/pdf");
    res.send(relatorio);
};

export const dashboard = async (req: Request, res: Response) => {
    let userRepo = new UserDatabaseRepository();
    let customerRepo = new CustomerDatabaseRepository();
    let processRepo = new ProcessDatabaseRepository();

    let usuarios = await userRepo.list();
    let usuariosEmUso = usuarios.length;
    let usuariosAtivos = 0;
    let usuariosInativos = 0;

    usuarios.map((usuario) => {
        if (usuario.enabled) usuariosAtivos++;
        else usuariosInativos++;
    });

    let [clientes, qtdClientes] = await customerRepo.list("", 50000);

    let clientesHomem = 0;
    let clientesMulher = 0;

    clientes.map((cliente) => {
        if (cliente.gender == "M") clientesHomem++;
        else clientesMulher++;
    });

    let processos = await processRepo.listAll();
    let processosEmAberto = 0;
    let processosFinalizados = 0;

    processos.map((processo) => {
        if (processo.active) processosEmAberto++;
        else processosFinalizados++;
    });

    let qtdProcessos = processos.length;

    res.json({
        usuariosEmUso,
        usuariosAtivos,
        usuariosInativos,
        qtdClientes,
        clientesHomem,
        clientesMulher,
        qtdProcessos,
        processosEmAberto,
        processosFinalizados,
    });
};

