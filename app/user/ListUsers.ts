import { ITransportUser, User } from "../../entities/User";
import UserRepository from "../../db/contracts/UserRepository";

export default class ListUsers {
	constructor(readonly repository: UserRepository) {}

	execute = async (): Promise<Array<User> | undefined> => {
		let users = await this.repository.list();

		if (users instanceof Array) {
			users.map((user: ITransportUser) => {
				return user;
			});

			return users;
		}
	};
}
