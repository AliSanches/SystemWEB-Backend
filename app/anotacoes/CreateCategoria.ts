import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class CreateCategoria {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (categoria) => {
		return await this.repository.createCategoria(categoria);
	};
}
