import CustomerRepository from "../../db/contracts/CustomerRepository";
import { DateTime } from "luxon";

class ListCustomers {
    constructor(readonly repository: CustomerRepository) {}

    execute = async (search: string, number: number): Promise<object> => {
        let [data, count] = await this.repository.list(search, number);

        data = data.map((customer: any) => {
            let birthdate = DateTime.fromJSDate(customer.birthdate);
            let age = DateTime.now().diff(birthdate, "years").years;
            age = Math.floor(age);

            birthdate = new Date(customer.birthdate).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
            });

            return { ...customer, age, birthdate };
        });

        return { data, count };
    };
}

export { ListCustomers };

