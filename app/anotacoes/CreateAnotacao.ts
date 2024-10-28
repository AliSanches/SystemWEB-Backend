import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class CreateAnotacao {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (anotacao) => {
		return await this.repository.createAnotacao(anotacao);
	};
}
