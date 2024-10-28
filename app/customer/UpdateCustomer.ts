import CustomerRepository from "../../db/contracts/CustomerRepository";
import { Customer, TCustomer } from "../../entities/Customer";

class UpdateCustomer {
	constructor(private readonly repository: CustomerRepository) {}

	async execute(customer: Customer): Promise<TCustomer> {
		const customerExists = await this.repository.get(customer.id);
		const updatedCustomer = await this.repository.update(customer);

		return updatedCustomer;
	}
}

export { UpdateCustomer };
