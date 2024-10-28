import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class UpdateAnotacao {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (id: number, data) => {
		return await this.repository.updateAnotacao(id, data);
	};
}
