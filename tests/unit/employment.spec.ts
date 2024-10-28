import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import { mock } from "jest-mock-extended";
import { CreateEmployment } from "../../app/employment/CreateEmployment";
import { GetEmployment } from "../../app/employment/GetEmployment";
import { UpdateEmployment } from "../../app/employment/UpdateEmployment";
import { DeleteEmployment } from "../../app/employment/DeleteEmployment";
import { ListEmployment } from "../../app/employment/ListEmployment";
import { TUser } from "../../entities/User";
import { TCustomer } from "../../entities/Customer";

const mockCustomer: TCustomer = {
	id: 1,
	name: "Customer 1",
	birthdate: new Date(),
	gender: "F",
	createdAt: new Date(),
	updatedAt: new Date(),
};

const employmentData = {
	id: 1,
	company: "Employment 1",
	position: "Position 1",
	createdAt: new Date("2020-01-01"),
	updatedAt: new Date("2020-01-01"),
	startDate: new Date("2010-01-01"),
	endDate: new Date("2020-01-01"),
	periodIsSpecial: false,
	considerGracePeriod: false,
	customerId: 1,
	customer: mockCustomer,
};

const mockedReturnData = {
	id: 1,
	company: "Employment 1",
	position: "Position 1",
	createdAt: new Date("2020-01-01"),
	updatedAt: new Date("2020-01-01"),
	startDate: new Date("2010-01-01"),
	durationYears: 10,
	durationMonths: 0,
	durationDays: 0,
	endDate: new Date("2020-01-01"),
	periodIsSpecial: false,
	considerGracePeriod: false,
	gracePeriodMonths: 0,
	customerId: 1,
	customer: mockCustomer,
};

const mockUser: TUser = {
	id: 1,
	name: "User 1",
	email: "user@mail.com",
	createdAt: new Date(),
	updatedAt: new Date(),
	password: "",
};

const mockUnauthorizedUser: TUser = {
	id: 1,
	name: "User 1",
	email: "user@mail.com",
	createdAt: new Date(),
	updatedAt: new Date(),
	password: "",
};

describe("Employment unit tests ▼", () => {
	it("should be able to create a new employment", async () => {
		const repository = mock<EmploymentDatabaseRepository>();
		repository.create.mockResolvedValueOnce(mockedReturnData);

		const createEmployment = new CreateEmployment(repository);

		const employment = await createEmployment.execute(employmentData, mockCustomer, mockUser);

		expect(employment).toBeTruthy();
		expect(employment).toHaveProperty("id");
		expect(employment).toHaveProperty("company");
		expect(employment).toHaveProperty("position");
		expect(employment).toHaveProperty("createdAt");
		expect(employment).toHaveProperty("updatedAt");
		expect(employment).toHaveProperty("startDate");
		expect(employment).toHaveProperty("endDate");
		expect(employment).toHaveProperty("considerGracePeriod");
		expect(employment).toHaveProperty("customerId");
	});

	it("should be able to create a new employment and calculate the grace period", async () => {
		const repository = mock<EmploymentDatabaseRepository>();
		repository.create.mockResolvedValueOnce(mockedReturnData);

		const createEmployment = new CreateEmployment(repository);

		const employment = await createEmployment.execute(
			{ ...employmentData, considerGracePeriod: true },
			mockCustomer,
			mockUser
		);

		expect(employment).toBeTruthy();
		expect(employment).toHaveProperty("id");
		expect(employment).toHaveProperty("company");
		expect(employment).toHaveProperty("position");
		expect(employment).toHaveProperty("createdAt");
		expect(employment).toHaveProperty("updatedAt");
		expect(employment).toHaveProperty("startDate");
		expect(employment).toHaveProperty("endDate");
		expect(employment).toHaveProperty("considerGracePeriod");
		expect(employment).toHaveProperty("customerId");
	});

	it("should return the employment and the calculated duration", async () => {
		const repository = mock<EmploymentDatabaseRepository>();
		const getEmployment = new GetEmployment(repository);
		repository.get.mockResolvedValueOnce(mockedReturnData);

		const employment = await getEmployment.execute(1, mockUser);

		expect(employment).toBeTruthy();
		expect(employment).toHaveProperty("id");
		expect(employment).toHaveProperty("company");
		expect(employment).toHaveProperty("position");
		expect(employment).toHaveProperty("createdAt");
		expect(employment).toHaveProperty("updatedAt");
		expect(employment).toHaveProperty("startDate");
		expect(employment).toHaveProperty("endDate");
		expect(employment).toHaveProperty("considerGracePeriod");
		expect(employment).toHaveProperty("customerId");
		//expect(employment).toHaveProperty("duration");
	});

	it("should return an array of employment registers", async () => {
		const repository = mock<EmploymentDatabaseRepository>();
		const listEmployment = new ListEmployment(repository);
		repository.list.mockResolvedValueOnce([mockedReturnData, mockedReturnData]);

		const { employments } = await listEmployment.execute(1, mockUser);

		expect(employments).toBeTruthy();
		expect(employments.length).toBeGreaterThanOrEqual(1);
		expect(employments[0]).toHaveProperty("id");
		expect(employments[0]).toHaveProperty("company");
		expect(employments[0]).toHaveProperty("position");
		expect(employments[0]).toHaveProperty("createdAt");
		expect(employments[0]).toHaveProperty("updatedAt");
		expect(employments[0]).toHaveProperty("startDate");
		expect(employments[0]).toHaveProperty("endDate");
		expect(employments[0]).toHaveProperty("considerGracePeriod");
		expect(employments[0]).toHaveProperty("customerId");
	});

	it("should return the updated employment", async () => {
		const repository = mock<EmploymentDatabaseRepository>();
		const updateEmployment = new UpdateEmployment(repository);
		repository.update.mockResolvedValueOnce(mockedReturnData);
		repository.get.mockResolvedValueOnce(mockedReturnData);
		const employment = await updateEmployment.execute(employmentData, mockUser);

		expect(employment).toBeTruthy();
		//expect(employment).toMatchObject(employmentData);
	});

	it("should successfully delete an employment", async () => {
		const repository = mock<EmploymentDatabaseRepository>();
		const deleteEmployment = new DeleteEmployment(repository);
		repository.delete.mockResolvedValueOnce(true);
		repository.get.mockResolvedValueOnce(mockedReturnData);
		const employment = await deleteEmployment.execute(1, mockUser);

		expect(employment).toBeTruthy();
		expect(employment).toBe(true);
	});

	it("should throw an error when trying to delete an employment that does not exist", async () => {
		const repository = mock<EmploymentDatabaseRepository>();
		const deleteEmployment = new DeleteEmployment(repository);
		repository.get.mockRejectedValue(new Error("err_employment_not_found"));
		repository.delete.mockResolvedValueOnce(false);

		await expect(deleteEmployment.execute(1, mockUser)).rejects.toThrowError("err_employment_not_found");
	});
});
