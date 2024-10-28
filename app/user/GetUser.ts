import UserRepository from "../../db/contracts/UserRepository";

export class GetUser {
	constructor(readonly repository: UserRepository) {}

	execute = async (userId: number) => {
		const user = await this.repository.get(userId);
		return user;
	};
}
