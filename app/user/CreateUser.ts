import { ICreateUser, ITransportUser, User, TUser } from "../../entities/User";
import UserRepository, { ICreateUserReturn } from "../../db/contracts/UserRepository";
import HashPassword from "./HashPassword";

export default class CreateUser {
	constructor(readonly repository: UserRepository) {}

	execute = async (user: ICreateUser): Promise<ICreateUserReturn> => {
		const hashPassword = new HashPassword();

		const hashedPassword = hashPassword.execute(user.password);

		//se nao tem acesso aos clientes logo nao pode ter acesso aos processos deles
		if (user.permissions.clientes === 0) user.permissions.processos = 0;

		const newUser = await this.repository.create({ ...user, password: hashedPassword });

		delete newUser.password;
		return newUser;
	};
}
