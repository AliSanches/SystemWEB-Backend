import { ProcessRepository } from "../../db/contracts/ProcessRepository";
import { ICreateProcess } from "../../entities/Process";

export class CreateProcess {
	constructor(private readonly processRepository: ProcessRepository) {}

	async execute(process: ICreateProcess, userId: number) {
		const query = await this.processRepository.create(process, userId);
		return query;
	}
}
