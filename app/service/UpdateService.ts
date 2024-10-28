import { ServiceRepository } from "../../db/contracts/ServiceRepository";
import { IUpdateService } from "../../entities/Service";

export class UpdateService {
	constructor(private readonly serviceRepository: ServiceRepository) {}

	async execute(data: IUpdateService) {
		const service = await this.serviceRepository.update({ name: data.name, id: data.id, enabled: data.enabled });
		return service;
	}
}