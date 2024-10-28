import { ICreateUser, ITransportUser, User, TUser } from "../../entities/User";

export default interface UserRepository {
	create(user: ICreateUser): Promise<ICreateUserReturn>;
	delete(id: number): Promise<boolean>;
	update(user: ITransportUser): Promise<TUser>;
	list(): Promise<User[]>;
	get(userId: number): Promise<User>;
	findByEmailAndPassword(email: string, password: string): Promise<TUser | null>;
}

export interface ICreateUserReturn extends Omit<TUser, "password"> {
	password?: string;
}
