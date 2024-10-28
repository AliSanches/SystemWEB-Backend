import { AnotacoesRepository } from "./../../db/contracts/AnotacoesRepository";

export class DeletaCategoria {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (id: number) => {
		return await this.repository.deletaCategoria(id);
	};
}
