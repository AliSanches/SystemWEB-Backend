import { ICreateProcess, IUpdateProcess, TProcess } from "../../entities/Process";
import { ProcessRepository } from "../contracts/ProcessRepository";
import { prismaClient } from "../prismaClient";

export class ProcessDatabaseRepository implements ProcessRepository {
    create = async (process: ICreateProcess, userId: number): Promise<TProcess> => {
        const query = await prismaClient.process.create({
            data: {
                ...process,
                notes: {
                    create: {
                        userId,
                    },
                },
            },
        });

        return query;
    };

    list = async (customerId: number): Promise<TProcess[]> => {
        const query = await prismaClient.process.findMany({
            where: {
                customerId,
            },
            include: {
                service: true,
            },
        });

        return query;
    };

    listAll = async () => {
        const query = await prismaClient.process.findMany({});

        return query;
    };

    update = async (data: IUpdateProcess, processId: number): Promise<TProcess> => {
        const query = await prismaClient.process.update({
            where: {
                id: processId,
            },
            data,
        });

        return query;
    };

    finish = async (processId: number, userId: number, text: string): Promise<TProcess> => {
        const query = await prismaClient.process.update({
            where: {
                id: processId,
            },
            data: {
                active: false,
                notes: {
                    create: {
                        userId,
                        title: "Processo finalizado",
                        text,
                    },
                },
            },
        });

        return query;
    };

    reopen = async (processId: number, text, userId: number): Promise<TProcess> => {
        const query = await prismaClient.process.update({
            where: {
                id: processId,
            },
            data: {
                active: true,
                notes: {
                    create: {
                        userId,
                        title: "Processo reaberto",
                        text,
                    },
                },
            },
        });

        return query;
    };

    get = async (processId: number): Promise<TProcess | null> => {
        const query = await prismaClient.process.findUnique({
            where: {
                id: processId,
            },
        });

        return query;
    };

    delete = async (id: number) => {
        const query = await prismaClient.process.delete({
            where: {
                id,
            },
        });

        return query;
    };
}

