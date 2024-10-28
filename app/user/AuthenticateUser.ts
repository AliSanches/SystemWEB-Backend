import SignToken from "./SignToken";
import HashPassword from "./HashPassword";
import UserRepository from "../../db/contracts/UserRepository";
import { ITransportUser, User } from "../../entities/User";

export default class AuthenticateUser {
	constructor(readonly repository: UserRepository) {}

	execute = async ({ email, password }) => {
		const signToken = new SignToken();
		const hashPassword = new HashPassword();

		password = hashPassword.execute(password);
		let user = await this.repository.findByEmailAndPassword(email, password);
		if (user && user.enabled) {
			await this.updateLastLogin(user);
			const token = signToken.execute(user);

			return { ...user, token };
		} else {
			throw new Error("err_wrong_credentials");
		}
	};

	private updateLastLogin = async (user: ITransportUser): Promise<void> => {
		const now = Math.floor(Date.now() / 1000);
		user.lastLogin = now;

		const copyUser = Object.assign({}, user);
		await this.repository.update(copyUser);
	};
}
