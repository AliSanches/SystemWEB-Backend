import { ICreateEmployment, IUpdateEmployment, TEmployment } from "../../entities/Employment";
import { EmploymentRepository } from "../contracts/EmploymentRepository";
import { prismaClient } from "../prismaClient";

export class EmploymentDatabaseRepository implements EmploymentRepository {
    constructor() {}

    create = async (employment: ICreateEmployment): Promise<TEmployment> => {
        const query = await prismaClient.employment.create({
            data: {
                ...employment,
            },
        });

        return query;
    };

    get = async (id: number): Promise<TEmployment> => {
        const employment = await prismaClient.employment.findUnique({
            where: {
                id,
            },
            include: {
                customer: true,
            },
        });

        if (!employment) {
            throw new Error("err_employment_not_found");
        }

        return employment;
    };

    list = async (customerId: number): Promise<TEmployment[]> => {
        const query = await prismaClient.employment.findMany({
            where: {
                customerId,
            },
            include: {
                customer: true,
            },
        });

        return query;
    };

    update = async (employment: IUpdateEmployment): Promise<TEmployment> => {
        const query = await prismaClient.employment.update({
            where: {
                id: employment.id,
            },
            data: {
                ...employment,
            },
        });

        return query;
    };

    delete = async (id: number): Promise<boolean> => {
        const query = await prismaClient.employment.delete({
            where: {
                id,
            },
        });

        return !!query;
    };
}
