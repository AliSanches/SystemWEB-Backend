import { EmploymentRepository } from "../../db/contracts/EmploymentRepository";
import { TEmployment } from "../../entities/Employment";
import { TUser } from "../../entities/User";

export class DeleteEmployment {
	constructor(readonly repository: EmploymentRepository) {}

	execute = async (id: number, user: TUser): Promise<boolean> => {
		const employment = await this.repository.get(id);

		return await this.repository.delete(id);
	};
}
