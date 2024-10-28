import { ServiceRepository } from "../../db/contracts/ServiceRepository";

export class ListServices {
	constructor(private readonly serviceRepository: ServiceRepository) {}

	async all() {
		const services = await this.serviceRepository.listAll();
		return services;
	}

	async enabled() {
		const services = await this.serviceRepository.listEnabled();
		return services;
	}
}
