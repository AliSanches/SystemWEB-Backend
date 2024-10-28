import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class ListaQtdAnotacaoPorSubcategoria {
    constructor(readonly repository: AnotacoesRepository) {}

    execute = async (id) => {
        return await this.repository.listQtdAnotacaoPorSubcategoria(id);
    };
}

