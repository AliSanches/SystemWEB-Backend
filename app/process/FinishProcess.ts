import { ProcessRepository } from "../../db/contracts/ProcessRepository";

export class FinishProcess {
	constructor(readonly repository: ProcessRepository) {}

	execute = async (processId: number, userId: number, texto) => {
		return await this.repository.finish(processId, userId, texto);
	};
}
