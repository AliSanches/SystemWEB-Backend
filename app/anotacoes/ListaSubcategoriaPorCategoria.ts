import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class ListaSubcategoriaPorCategoria {
    constructor(readonly repository: AnotacoesRepository) {}

    execute = async (id) => {
        return await this.repository.getSubcategoriaPorCategoria(id);
    };
}
