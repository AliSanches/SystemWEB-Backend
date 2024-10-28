import UserRepository from "../../db/contracts/UserRepository";
import { TUser } from "../../entities/User";
import { hashPassword } from "./HashPassword";

export default class UpdateUser {
	constructor(readonly repository: UserRepository) {}

	execute = async (userData: any): Promise<TUser> => {
		let user = { ...userData, id: userData.userId };

		if (!userData.password) delete user.password;
		else {
			user.password = hashPassword(userData.password);
		}

		delete user.userId;

		//se nao tem acesso aos clientes logo nao pode ter acesso aos processos deles
		if (user.permissions && user.permissions.clientes === 0) user.permissions.processos = 0;

		const updatedUser = await this.repository.update(user);

		return updatedUser;
	};
}
