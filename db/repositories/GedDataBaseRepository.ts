import { prismaClient } from "../prismaClient";

export class GedDataBaseRepository {
    getAttachment = async () => {
        return await prismaClient.ged.findMany({
            include: {
                ged_categoria: true,
            },
        });
    };

    getAttachmentById = async (id: number) => {
        return await prismaClient.ged_categoria.findUnique({
            where: {
                id: id,
            },
            include: {
                ged: true,
            },
        });
    };

    getAttachmentId = async (id: number) => {
        return await prismaClient.ged.findFirst({
            where: {
                id,
            },
        });
    };

    getPastas = async (search: string) => {
        return await prismaClient.ged_categoria.findMany({
            where: {
                titulo: {
                    contains: search,
                },
            },
            orderBy: {
                titulo: "asc",
            },
            select: {
                id: true,
                titulo: true,
            },
        });
    };

    createPasta = async (data) => {
        return await prismaClient.ged_categoria.create({
            data: {
                titulo: data,
            },
        });
    };

    attachFile = async (name: string, original_name: string, description: string, ged_categoriaId: number) => {
        try {
            return await prismaClient.ged.create({
                data: {
                    description,
                    name,
                    original_name,
                    ged_categoriaId,
                },
            });
        } catch (err) {
            throw new Error("err_attach_file");
        }
    };

    deleteFolder = async (id: number) => {
        return await prismaClient.ged_categoria.delete({
            where: {
                id,
            },
            include: {
                ged: true,
            },
        });
    };

    deleteFile = async (id: number) => {
        return await prismaClient.ged.delete({
            where: {
                id,
            },
        });
    };

    renameFile = async (id: number, description: string) => {
        return await prismaClient.ged.update({
            where: {
                id,
            },
            data: {
                description,
            },
        });
    };
}

