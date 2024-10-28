import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class CreateSubcategoria {
    constructor(readonly repository: AnotacoesRepository) {}

    execute = async (subcategoria) => {
        return await this.repository.createSubcategoria(subcategoria);
    };
}

