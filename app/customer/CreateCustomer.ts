import { Customer, TCustomer } from "../../entities/Customer";
import CustomerRepository from "../../db/contracts/CustomerRepository";

class CreateCustomer {
	constructor(readonly repository: CustomerRepository) {}

	execute = async (customer: TCustomer): Promise<Customer> => {
		const newCustomer = await this.repository.create(customer);

		return newCustomer;
	};
}

export { CreateCustomer };
