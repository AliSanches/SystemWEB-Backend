import { ICreateService } from "../../entities/Service";

export class CreateService {
	constructor(private readonly serviceRepository) {}

	execute = async (data: ICreateService) => {
		const service = await this.serviceRepository.create(data);

		return service;
	};
}
