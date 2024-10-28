import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class ListaSubcategoriaAll {
    constructor(readonly repository: AnotacoesRepository) {}

    execute = async () => {
        return await this.repository.listSubcategoriasAll();
    };
}

