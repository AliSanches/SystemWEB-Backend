import { AnotacoesRepository } from "./../../db/contracts/AnotacoesRepository";

export class DeletaSubcategoria {
    constructor(readonly repository: AnotacoesRepository) {}

    execute = async (id: number) => {
        return await this.repository.deletaSubcategoria(id);
    };
}

