import CustomerRepository from "../../db/contracts/CustomerRepository";
import { TCustomer } from "../../entities/Customer";
import { TUser } from "../../entities/User";

class DeleteCustomer {
	constructor(private customerRepository: CustomerRepository) {}

	public async execute(id: number, user: TUser): Promise<boolean> {
		const customer = await this.customerRepository.get(id);

		if (!customer) {
			throw new Error("Customer not found");
		} else return await this.customerRepository.delete(id);
	}
}

export { DeleteCustomer };
