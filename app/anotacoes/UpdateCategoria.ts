import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class UpdateCategoria {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (id: number, categoria) => {
		return await this.repository.updateCategoria(id, categoria);
	};
}
