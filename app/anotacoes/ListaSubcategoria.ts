import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class ListaSubcategoriaId {
    constructor(readonly repository: AnotacoesRepository) {}

    execute = async (id) => {
        return await this.repository.listSubcategoriaId(id);
    };
}

