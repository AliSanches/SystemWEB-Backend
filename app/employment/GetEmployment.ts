import { EmploymentRepository } from "../../db/contracts/EmploymentRepository";
import { TEmployment } from "../../entities/Employment";
import { TUser } from "../../entities/User";

export class GetEmployment {
	constructor(readonly repository: EmploymentRepository) {}

	execute = async (id: number, user: TUser) => {
		const employment = await this.repository.get(id);

		return employment;
	};
}
