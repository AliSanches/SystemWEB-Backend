import { ServiceRepository } from "../../db/contracts/ServiceRepository";

export class DeleteService {
	constructor(readonly repository: ServiceRepository) {}

	execute = async (id: number) => {
		const query = await this.repository.delete(id);

		return query;
	};
}
