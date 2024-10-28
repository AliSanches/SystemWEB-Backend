import { anotacao_categoria, anotacao_subcategoria } from "@prisma/client";
import { Anotacao } from "../../entities/Anotacoes";

export interface AnotacoesRepository {
    listaAnotacoes(search: string, skip: number): Promise<{ anotacoes: Anotacao[]; count: number }>;
    getAnotacao(id: number): Promise<Anotacao | null>;
    updateAnotacao(id: number, data: any): Promise<Anotacao | null>;
    updateSubcategoria(id: number, data: any): Promise<anotacao_subcategoria | null>;
    createAnotacao(data: any): Promise<Anotacao>;
    listCategoria(search: string, skip: number, all): Promise<{ categorias: any[]; count: number }>;
    listSubcategoriasAll();
    listQtdAnotacaoPorSubcategoria(id: number);
    getSubcategoriaPorCategoria(id: number): Promise<anotacao_categoria | null>;
    listSubcategoriaId(id: number);
    updateCategoria(id: number, categoria: any): Promise<any>;
    createCategoria(categoria: any): Promise<any>;
    createSubcategoria(subcategoria: any): Promise<anotacao_subcategoria>;
    deleteAnotacao(id: number): Promise<any>;
    deletaCategoria(id: number): Promise<any>;
    deletaSubcategoria(id: number): Promise<any>;
}

