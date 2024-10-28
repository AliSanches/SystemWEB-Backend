import { ListCustomers } from "../../app/customer/ListCustomers";
import { CreateCustomer } from "../../app/customer/CreateCustomer";
import { UpdateCustomer } from "../../app/customer/UpdateCustomer";
import { DeleteCustomer } from "../../app/customer/DeleteCustomer";
import { CustomerDatabaseRepository } from "../../db/repositories/CustomerDatabaseRepository";
import { Customer } from "../../entities/Customer";
import { mock } from "jest-mock-extended";
import { GetCustomer } from "../../app/customer/GetCustomer";
import { TUser } from "../../entities/User";

const customer = {
	id: Math.floor(Math.random() * (40 - 10)),
	createdAt: new Date(),
	updatedAt: new Date(),
	name: "test",
	gender: "F",
	birthdate: new Date(),
};

let mockUser: TUser = {
	id: 1,
	name: "John",
	email: "john@jest.com",
	password: "123456",
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe("Customer unit tests ▼", () => {
	it("should return an array of users, and the total number of user in the database", async () => {
		const customerRepository = mock<CustomerDatabaseRepository>();
		customerRepository.list.mockResolvedValue([new Array(10).fill(new Customer(customer)), 10]);
		const listCustomers = new ListCustomers(customerRepository);

		const search = "";
		const number = 20;

		const { data, count } = (await listCustomers.execute(search, number)) as { data: any; count: number };

		expect(data.length).toBeGreaterThanOrEqual(1);
		expect(typeof count).toBe("number");
	});

	it("should return the created customer", async () => {
		const customerRepository = mock<CustomerDatabaseRepository>();
		customerRepository.create.mockResolvedValue(new Customer(customer));
		const createCustomer = new CreateCustomer(customerRepository);
		const newCustomer = await createCustomer.execute(customer);

		expect(newCustomer).toBeInstanceOf(Customer);
	});

	it("should return the updated customer", async () => {
		const customerRepository = mock<CustomerDatabaseRepository>();
		customerRepository.get.mockResolvedValue(new Customer(customer));
		customerRepository.update.mockResolvedValue(new Customer(customer));

		const updateCustomer = new UpdateCustomer(customerRepository);
		const updatedCustomer = await updateCustomer.execute(customer);

		expect(updatedCustomer).toBeInstanceOf(Customer);
	});

	it("should get the customer by the given id", async () => {
		const customerRepository = mock<CustomerDatabaseRepository>();
		customerRepository.get.mockResolvedValue(customer);

		const getCustomer = new GetCustomer(customerRepository);
		const foundCustomer = await getCustomer.execute(customer.id, mockUser);

		expect(typeof foundCustomer).toBe("object");
		expect(foundCustomer).toHaveProperty("id");
		expect(foundCustomer).toHaveProperty("name");
		expect(foundCustomer).toHaveProperty("gender");
	});

	it("should return true when it successfully deletes a user", async () => {
		const customerRepository = mock<CustomerDatabaseRepository>();
		customerRepository.delete.mockResolvedValue(true);
		customerRepository.get.mockResolvedValue(customer);
		const deletedCustomer = new DeleteCustomer(customerRepository);

		await expect(deletedCustomer.execute(customer.id, mockUser)).resolves.toBe(true);
	});
});
