import CustomerRepository from "../contracts/CustomerRepository";
import { prismaClient as db } from "../prismaClient";
import { Customer, TCustomer, ITransportCustomer, IUpdateCustomer } from "../../entities/Customer";

class CustomerDatabaseRepository implements CustomerRepository {
    list = async (search: string, number: number): Promise<[Customer[], number]> => {
        let customers = await db.customer.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
            include: {
                processes: true,
            },
            orderBy: {
                id: "desc",
            },
            take: number,
        });
        const customerCount = await db.customer.count({
            where: {
                name: {
                    contains: search,
                },
            },
        });

        return [customers, customerCount];
    };

    get = async (id: number): Promise<Customer> => {
        const customer = await db.customer.findFirst({
            where: {
                id,
            },
            include: {
                attachments: true,
            },
        });

        if (!customer) {
            throw new Error("Customer not found");
        }
        return new Customer(customer);
    };

    create = async (customer: ITransportCustomer): Promise<Customer> => {
        try {
            const newCustomer = await db.customer.create({
                data: {
                    ...customer,
                },
            });

            return new Customer(newCustomer);
        } catch (error) {
            throw new Error(error);
        }
    };

    update = async (customer: IUpdateCustomer): Promise<Customer> => {
        const updatedCustomer = await db.customer.update({
            where: {
                id: customer.id,
            },
            data: {
                ...customer,
            },
        });

        return new Customer(updatedCustomer);
    };

    delete = async (id: number): Promise<boolean> => {
        try {
            await db.customer.delete({
                where: {
                    id,
                },
            });

            return true;
        } catch (err) {
            throw new Error("err_delete_customer");
        }
    };

    attachFile = async (id: number, name: string, original_name: string, description: string) => {
        try {
            return await db.customer.update({
                where: {
                    id,
                },
                data: {
                    attachments: {
                        create: {
                            name,
                            original_name,
                            description,
                        },
                    },
                },
            });
        } catch (err) {
            throw new Error("err_attach_file");
        }
    };

    getAttachment = async (id: number) => {
        return await db.attachment.findFirst({
            where: {
                id,
            },
        });
    };

    deleteFile = async (id: number) => {
        return await db.attachment.delete({
            where: {
                id,
            },
        });
    };

    renameFile = async (id: number, description: string) => {
        return await db.attachment.update({
            where: {
                id,
            },
            data: {
                description,
            },
        });
    };
}

export { CustomerDatabaseRepository };

