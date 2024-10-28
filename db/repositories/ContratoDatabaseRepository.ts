import { prismaClient } from "../prismaClient";
import { ContratoRepository } from "../contracts/ContratoRepository";

export class ContratoDatabaseRepository implements ContratoRepository {
    create = async (titulo, texto) => {
        let query = await prismaClient.template_contrato.create({
            data: {
                titulo,
                texto,
            },
        });

        if (query) return query;
    };

    list = async () => {
        let query = await prismaClient.template_contrato.findMany();

        if (query) return query;
    };

    edit = async (id, data) => {
        let query = await prismaClient.template_contrato.update({
            where: {
                id,
            },
            data: {
                texto: data.texto,
                titulo: data.titulo,
            },
        });

        if (query) return query;
    };

    getById = async (id) => {
        let query = await prismaClient.template_contrato.findFirst({
            where: {
                id,
            },
        });

        if (query) return query;
    };

    deleteOne = async (id) => {
        let query = await prismaClient.template_contrato.delete({
            where: {
                id,
            },
        });

        if (query) return query;
    };
}

