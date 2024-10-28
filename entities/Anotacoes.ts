export type CategoriaAnotacao = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    titulo?: string | null;
    descricao?: string | null;
    anotacoes?: Anotacao[];
};

export type Anotacao = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    titulo?: string | null;
    texto?: string | null;
    categoria?: CategoriaAnotacao | null;
    categoriaId: number;
};

