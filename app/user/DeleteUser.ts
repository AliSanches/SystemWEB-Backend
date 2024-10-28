import UserRepository from "../../db/contracts/UserRepository";

export default class DeleteUser {
	constructor(readonly repository: UserRepository) {}

	execute = async (userId: number): Promise<boolean> => {
		const deletedUser = await this.repository.delete(userId);

		return deletedUser;
	};
}
