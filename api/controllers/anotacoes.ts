import { ListaQtdAnotacaoPorSubcategoria } from "./../../app/anotacoes/ListaQtdAnotacaoPorSubcategoria";
import { CreateSubcategoria } from "./../../app/anotacoes/CreateSubcategoria";
import { WikiDatabaseRepository } from "./../../db/repositories/AnotacoesDatabaseRepository";
import { Request, Response } from "express";
import { ListaAnotacoes } from "../../app/anotacoes/ListaAnotacoes";
import { GetAnotacao } from "../../app/anotacoes/GetAnotacao";
import { UpdateAnotacao } from "../../app/anotacoes/UpdateAnotacao";
import { UpdateSubcategoria } from "../../app/anotacoes/UpdateSubcategoria";
import { CreateAnotacao } from "../../app/anotacoes/CreateAnotacao";
import { ListaCategorias } from "../../app/anotacoes/ListaCategorias";
import { ListaSubcategoriaId } from "../../app/anotacoes/ListaSubcategoria";
import { ListaSubcategoriaAll } from "../../app/anotacoes/ListaSubcategoriasAll";
import { ListaSubcategoriaPorCategoria } from "../../app/anotacoes/ListaSubcategoriaPorCategoria";
import { UpdateCategoria } from "../../app/anotacoes/UpdateCategoria";
import { CreateCategoria } from "../../app/anotacoes/CreateCategoria";
import { DeletaAnotacao } from "./../../app/anotacoes/DeletaAnotacao";
import { DeletaCategoria } from "./../../app/anotacoes/DeletaCategoria";
import { DeletaSubcategoria } from "./../../app/anotacoes/DeletaSubcategoria";

export const listaAnotacoes = async (req: Request, res: Response) => {
    const search = req.query.search as string;
    const skip = req.query.skip!;

    const wikiRepository = new WikiDatabaseRepository();
    const listaAnotacoes = new ListaAnotacoes(wikiRepository);

    let anotacoes = await listaAnotacoes.execute(search, +skip);

    res.status(200).json(anotacoes);
};

export const getAnotacao = async (req: Request, res: Response) => {
    let { id } = req.params;

    const wikiRepository = new WikiDatabaseRepository();
    const getAnotacao = new GetAnotacao(wikiRepository);

    let anotacao = await getAnotacao.execute(+id);

    res.status(200).json(anotacao);
};

export const createAnotacao = async (req: Request, res: Response) => {
    let { titulo, texto, categoria, subcategoria } = req.body;

    const wikiRepository = new WikiDatabaseRepository();
    const createAnotacao = new CreateAnotacao(wikiRepository);

    const anotacao = await createAnotacao.execute({
        titulo: titulo,
        texto: texto,
        categoriaId: +categoria,
        subcategoriaId: +subcategoria,
    });

    res.status(200).json(anotacao);
};

export const updateAnotacao = async (req: Request, res: Response) => {
    let { id } = req.params;

    const wikiRepository = new WikiDatabaseRepository();
    const updateAnotacao = new UpdateAnotacao(wikiRepository);

    let anotacao = await updateAnotacao.execute(+id, req.body);

    res.status(200).json(anotacao);
};

export const listCategoria = async (req: Request, res: Response) => {
    const { search, skip, all } = req.query;

    const wikiRepository = new WikiDatabaseRepository();
    const listaCategorias = new ListaCategorias(wikiRepository);

    const categorias = await listaCategorias.execute(search as string, +skip!, all);

    res.status(200).json(categorias);
};

export const listSubcategoriasAll = async (req: Request, res: Response) => {
    const wikiRepository = new WikiDatabaseRepository();
    const listSubcategoria = new ListaSubcategoriaAll(wikiRepository);

    const subcategoria = await listSubcategoria.execute();

    res.status(200).json(subcategoria);
};

export const listSubcategoriaId = async (req: Request, res: Response) => {
    let { id } = req.params;

    const wikiRepository = new WikiDatabaseRepository();
    const listSubcategoria = new ListaSubcategoriaId(wikiRepository);

    const subcategoria = await listSubcategoria.execute(+id);

    res.status(200).json(subcategoria);
};

export const listQtdAnotacaoPorSubcategoria = async (req: Request, res: Response) => {
    let { id } = req.params;

    const wikiRepository = new WikiDatabaseRepository();
    const listSubcategoria = new ListaQtdAnotacaoPorSubcategoria(wikiRepository);

    const QtdAnotacoes = await listSubcategoria.execute(+id);

    res.status(200).json({ QtdAnotacoes });
};

export const getSubcategoriaPorCategoria = async (req: Request, res: Response) => {
    let { id } = req.params;

    const wikiRepository = new WikiDatabaseRepository();
    const listSubcategoriaPorCategoria = new ListaSubcategoriaPorCategoria(wikiRepository);

    const listar = await listSubcategoriaPorCategoria.execute(+id);

    res.status(200).json(listar);
};

export const updateCategoria = async (req: Request, res: Response) => {
    let { id } = req.params;

    const wikiRepository = new WikiDatabaseRepository();
    const updateCategoria = new UpdateCategoria(wikiRepository);

    const categoria = updateCategoria.execute(+id, req.body);

    res.status(200).json(categoria);
};

export const updateSubcategoria = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { categoria, titulo } = req.body;

    const wikiRepository = new WikiDatabaseRepository();
    const updateSubcategiria = new UpdateSubcategoria(wikiRepository);

    const subcategoria = updateSubcategiria.execute(+id, {
        categoriaId: +categoria,
        titulo: titulo,
    });

    res.status(200).json(subcategoria);
};

export const createCategoria = async (req: Request, res: Response) => {
    const wikiRepository = new WikiDatabaseRepository();
    const createCategoria = new CreateCategoria(wikiRepository);

    const categoria = await createCategoria.execute(req.body);

    res.status(201).json(categoria);
};

export const createSubcategoria = async (req: Request, res: Response) => {
    let { categoria, titulo } = req.body;

    const wikiRepository = new WikiDatabaseRepository();
    const createSubcategoria = new CreateSubcategoria(wikiRepository);

    const subcategoria = await createSubcategoria.execute({
        categoriaId: +categoria,
        titulo: titulo,
    });

    res.status(201).json(subcategoria);
};

export const deleteAnotacao = async (req: Request, res: Response) => {
    const wikiRepository = new WikiDatabaseRepository();
    const deletaAnotacao = new DeletaAnotacao(wikiRepository);

    const deletada = await deletaAnotacao.execute(+req.params.id);

    res.status(200).json(deletada);
};

export const deleteCategoria = async (req: Request, res: Response) => {
    const wikiRepository = new WikiDatabaseRepository();
    const deletaCategoria = new DeletaCategoria(wikiRepository);

    const deletada = await deletaCategoria.execute(+req.params.id);

    res.status(200).json(deletada);
};

export const deleteSubcategoria = async (req: Request, res: Response) => {
    let { id } = req.params;

    const wikiRepository = new WikiDatabaseRepository();
    const deletaSubcategoria = new DeletaSubcategoria(wikiRepository);

    const deletada = await deletaSubcategoria.execute(+id);

    res.status(200).json(deletada);
};

