import { AnotacoesRepository } from "./../../db/contracts/AnotacoesRepository";

export class DeletaAnotacao {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (id: number) => {
		const query = await this.repository.deleteAnotacao(id);

		return query;
	};
}
