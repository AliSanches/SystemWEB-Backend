import CustomerRepository from "../../db/contracts/CustomerRepository";
import { TCustomer } from "../../entities/Customer";
import { TUser } from "../../entities/User";

export class GetCustomer {
    constructor(readonly repository: CustomerRepository) {}

    execute = async (id: number) => {
        const customer = await this.repository.get(id);

        let birthdate: Date | string = customer.birthdate as Date;
        let customerSince: Date | string = customer.customerSince as Date;

        birthdate = birthdate.toISOString().split("T")[0];
        customerSince = customerSince.toISOString().split("T")[0];
        return { ...customer, birthdate, customerSince };
    };
}
