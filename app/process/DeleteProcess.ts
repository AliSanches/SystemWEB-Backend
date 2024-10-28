import { ProcessRepository } from "../../db/contracts/ProcessRepository";

export class DeleteProcess {
	constructor(readonly repository: ProcessRepository) {}

	execute = async (id: number) => {
		const query = await this.repository.delete(id);

		return query;
	};
}
