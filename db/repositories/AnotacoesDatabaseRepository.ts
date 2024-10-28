import { AnotacoesRepository } from "../contracts/AnotacoesRepository";
import { Anotacao } from "../../entities/Anotacoes";
import { prismaClient } from "../prismaClient";
import { anotacao_categoria, anotacao_subcategoria } from "@prisma/client";

export class WikiDatabaseRepository implements AnotacoesRepository {
    createAnotacao = async (data: any): Promise<Anotacao> => {
        return await prismaClient.anotacao.create({
            data: {
                ...data,
            },
        });
    };

    updateAnotacao = async (id: number, data: any): Promise<Anotacao | null> => {
        return await prismaClient.anotacao.update({
            where: {
                id: id,
            },
            data: {
                ...data,
            },
        });
    };

    listaAnotacoes = async (search: string, skip: number): Promise<{ anotacoes: Anotacao[]; count: number }> => {
        const anotacaoCount = await prismaClient.anotacao.count({
            where: {
                titulo: {
                    contains: search,
                },
            },
        });

        const anotacoes = await prismaClient.anotacao.findMany({
            where: {
                titulo: {
                    contains: search,
                },
            },
            include: {
                categoria: true,
                subcategoria: true,
            },
            take: 5,
            skip,
        });

        return { anotacoes, count: anotacaoCount };
    };

    getAnotacao = async (id: number): Promise<Anotacao | null> => {
        return await prismaClient.anotacao.findUnique({
            where: {
                id: id,
            },
            include: {
                categoria: true,
                subcategoria: true,
            },
        });
    };

    getSubcategoriaPorCategoria = async (id: number): Promise<anotacao_categoria | null> => {
        return await prismaClient.anotacao_categoria.findUnique({
            where: { id: id },
            include: { anotacoes_subcategoria: true },
        });
    };

    updateSubcategoria = async (id: number, data: any): Promise<anotacao_subcategoria | null> => {
        return await prismaClient.anotacao_subcategoria.update({
            where: {
                id: id,
            },
            data: {
                ...data,
            },
        });
    };

    listCategoria = async (search: string, skip: number, all): Promise<{ categorias: any[]; count: number }> => {
        const count = await prismaClient.anotacao_categoria.count({
            where: {
                titulo: {
                    contains: search as string,
                },
            },
        });

        const categorias = await prismaClient.anotacao_categoria.findMany({
            where: {
                titulo: {
                    contains: search as string,
                },
            },
            take: all ? undefined : 5,
            skip: +skip!,
            include: {
                anotacoes_subcategoria: true,
                _count: {
                    select: {
                        anotacoes: true,
                        anotacoes_subcategoria: true,
                    },
                },
            },
        });

        return { categorias: categorias, count: count };
    };

    listSubcategoriasAll = async () => {
        const subcategoriasAll = await prismaClient.anotacao_subcategoria.findMany({
            select: {
                id: true,
                titulo: true,
            },
        });

        return subcategoriasAll;
    };

    listSubcategoriaId = async (id) => {
        const subcategoria = await prismaClient.anotacao_subcategoria.findMany({
            where: {
                categoriaId: id,
            },
            include: {
                categoria: true,
            },
        });

        return { subcategoria };
    };

    listQtdAnotacaoPorSubcategoria = async (id) => {
        const qtdAnotacao = await prismaClient.anotacao.count({
            where: {
                subcategoriaId: id,
            },
        });

        return { qtdAnotacao };
    };

    updateCategoria = async (id: number, categoria: any): Promise<any> => {
        return await prismaClient.anotacao_categoria.update({
            where: {
                id: id,
            },
            data: {
                ...categoria,
            },
        });
    };

    createCategoria = async (categoria: any): Promise<any> => {
        return await prismaClient.anotacao_categoria.create({
            data: { ...categoria },
        });
    };

    createSubcategoria = async (subcategoria: any): Promise<anotacao_subcategoria> => {
        return await prismaClient.anotacao_subcategoria.create({
            data: { ...subcategoria },
        });
    };

    deleteAnotacao = async (id: number) => {
        return await prismaClient.anotacao.delete({
            where: {
                id,
            },
        });
    };

    deletaCategoria = async (id: number) => {
        return await prismaClient.anotacao_categoria.delete({
            where: {
                id,
            },
        });
    };

    deletaSubcategoria = async (id: number) => {
        return await prismaClient.anotacao_subcategoria.delete({
            where: {
                id,
            },
        });
    };
}

