import { AnotacoesRepository } from "../../db/contracts/AnotacoesRepository";

export class ListaAnotacoes {
	constructor(readonly repository: AnotacoesRepository) {}

	execute = async (search: string, take: number) => {
		return await this.repository.listaAnotacoes(search, take);
	};
}
