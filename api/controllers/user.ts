import { UserDatabaseRepository } from "../../db/repositories/UserDatabaseRepository";
import AuthenticateUser from "../../app/user/AuthenticateUser";
import ListUsers from "../../app/user/ListUsers";
import CreateUser from "../../app/user/CreateUser";
import DeleteUser from "../../app/user/DeleteUser";
import UpdateUser from "../../app/user/UpdateUser";
import { Request, Response } from "express";
import { ListConfigs } from "./../../app/config/ListConfigs";
import { ConfigsDatabaseRepository } from "./../../db/repositories/ConfigsDatabaseRepository";

export const authenticate = async (req: Request, res: Response): Promise<void> => {
	const userRepository = new UserDatabaseRepository();
	const authenticateUser = new AuthenticateUser(userRepository);
	const user = await authenticateUser.execute(req.body);

	const configsRepository = new ConfigsDatabaseRepository();
	const getConfigs = new ListConfigs(configsRepository);

	const configs = await getConfigs.execute();

	res.status(200).json({ ...user, empresa: configs.empresa });
};

export const create = async (req, res: Response): Promise<void> => {
	const userRepository = new UserDatabaseRepository();
	const createUser = new CreateUser(userRepository);
	const createdUser = await createUser.execute(req.body);

	res.status(201).json(createdUser);
};

export const list = async (req, res: Response): Promise<void> => {
	const userRepository = new UserDatabaseRepository();
	const listUsers = new ListUsers(userRepository);
	const users = await listUsers.execute();

	res.status(200).json(users);
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
	const userRepository = new UserDatabaseRepository();
	const deleteUser = new DeleteUser(userRepository);
	await deleteUser.execute(req.body.userId);

	res.status(200).send();
};

export const update = async (req, res: Response): Promise<void> => {
	const userRepository = new UserDatabaseRepository();
	const updateUser = new UpdateUser(userRepository);
	const updatedUser = await updateUser.execute(req.body);

	res.status(200).json(updatedUser);
};
