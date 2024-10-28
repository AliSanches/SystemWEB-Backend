import { Customer } from "../../entities/Customer";

export default interface CustomerRepository {
    create(customer: Customer): Promise<Customer>;
    get(id: number): Promise<Customer>;
    list(search: string, number: number): Promise<[Customer[], number]>;
    update(customer: Customer): Promise<Customer>;
    delete(id: number): Promise<boolean>;
}
