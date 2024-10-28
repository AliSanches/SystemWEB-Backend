import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class GetAnotacao {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (id: number) => {
		return await this.repository.getAnotacao(id);
	};
}
