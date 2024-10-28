import AuthenticateUser from "../../app/user/AuthenticateUser";
import CreateUser from "../../app/user/CreateUser";
import DeleteUser from "../../app/user/DeleteUser";
import HashPassword from "../../app/user/HashPassword";
import ListUsers from "../../app/user/ListUsers";
import SignToken from "../../app/user/SignToken";
import UpdateUser from "../../app/user/UpdateUser";
import { UserDatabaseRepository } from "../../db/repositories/UserDatabaseRepository";

import { mock } from "jest-mock-extended";
import { User } from "../../entities/User";

const userData = {
	id: Math.random() as number,
	createdAt: new Date(),
	updatedAt: new Date(),
	lastLogin: Math.floor(Date.now() / 1000),
	email: "teste@teste.com",
	password: "123",
	name: "John Doe",
};

describe("User unit tests ▼", () => {
	it("should successfully return an instance of the authenticated user", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.findByEmailAndPassword.mockResolvedValue(new User(userData));

		const authenticateUser = new AuthenticateUser(userRepository);
		const user = await authenticateUser.execute(userData);

		expect(user).toHaveProperty("id");
		expect(user).toHaveProperty("name");
		expect(user).toHaveProperty("email");
		expect(user).toHaveProperty("token");
	});

	it("should throw an error if the user was not found", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.findByEmailAndPassword.mockReturnValue(Promise.resolve(null));

		const authenticateUser = new AuthenticateUser(userRepository);

		await expect(authenticateUser.execute(userData)).rejects.toThrow("err_wrong_credentials");
	});

	it("should successfully return the created user", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.create.mockResolvedValue(new User(userData));

		const createUser = new CreateUser(userRepository);
		const createdUser = await createUser.execute(userData);

		expect(createdUser).toBeInstanceOf(User);
	});

	it("should throw an error if the email is already in use", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.create.mockReturnValue(Promise.reject(new Error("err_email_key")));

		const createUser = new CreateUser(userRepository);

		await expect(createUser.execute(userData)).rejects.toThrow("err_email_key");
	});

	it("should be true if the user was deleted", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.delete.mockResolvedValue(true);

		const deleteUser = new DeleteUser(userRepository);
		const wasUserDeleted = await deleteUser.execute(userData.id);

		expect(wasUserDeleted).toBe(true);
	});

	it("should return the hashed password", async () => {
		const hashPassword = new HashPassword();
		const hash = hashPassword.execute("123");

		expect(typeof hash).toBe("string");
	});

	it("should return an array of users", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.list.mockResolvedValue(new Array(10).fill(new User(userData)));

		const listUsers = new ListUsers(userRepository);
		const users = await listUsers.execute();

		expect(users).toBeInstanceOf(Array);
		if (users instanceof Array) expect(users.length).toBeGreaterThan(1);
	});

	it("should return a signed token", async () => {
		const signToken = new SignToken();
		const token = signToken.execute(userData);

		expect(typeof token).toBe("string");
	});

	it("should confirm that the user was updated", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.update.mockResolvedValue(new User(userData));

		const updateUser = new UpdateUser(userRepository);
		const updatedUser = await updateUser.execute(userData);

		expect(updatedUser).toBeInstanceOf(User);
		expect(updatedUser).toHaveProperty("id");
		expect(updatedUser).toHaveProperty("name");
		expect(updatedUser).toHaveProperty("email");
	});

	it("should not allow to change a user email to one that is already in use", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.update.mockReturnValue(Promise.reject(new Error("err_email_key")));

		const updateUser = new UpdateUser(userRepository);
		await expect(updateUser.execute(userData)).rejects.toThrow("err_email_key");
	});

	it("should update the user without changing the current password", async () => {
		const userRepository = mock<UserDatabaseRepository>();
		userRepository.update.mockResolvedValue(new User(userData));

		const updateUser = new UpdateUser(userRepository);

		const updatedUser = await updateUser.execute({
			...userData,
			password: undefined,
		});

		expect(updatedUser).toBeInstanceOf(User);
		expect(updatedUser).toHaveProperty("id");
		expect(updatedUser).toHaveProperty("name");
		expect(updatedUser).toHaveProperty("email");
	});
});
