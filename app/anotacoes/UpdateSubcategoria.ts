import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class UpdateSubcategoria {
    constructor(readonly repository: AnotacoesRepository) {}

    execute = async (id: number, data) => {
        return await this.repository.updateSubcategoria(id, data);
    };
}

