import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class ListaCategorias {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (search, skip, all) => {
		return await this.repository.listCategoria(search, skip, all);
	};
}
