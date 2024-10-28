import { ConfigsDatabaseRepository } from "../../db/repositories/ConfigsDatabaseRepository";

export class UpdateConfigs {
	constructor(readonly repository: ConfigsDatabaseRepository) {}

	execute = async (data) => {
		return await this.repository.update(data);
	};
}
