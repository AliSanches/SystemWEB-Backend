import { Request, Response } from "express";
import { ConfigsDatabaseRepository } from "../../db/repositories/ConfigsDatabaseRepository";
import { UpdateConfigs } from "../../app/config/UpdateConfigs";
import { ListConfigs } from "../../app/config/ListConfigs";

export const update = async (req: Request, res: Response) => {
    const repository = new ConfigsDatabaseRepository();
    const useCase = new UpdateConfigs(repository);

    await useCase.execute(req.body);

    res.status(200).send();
};

export const get = async (req: Request, res: Response) => {
    const repository = new ConfigsDatabaseRepository();
    const useCase = new ListConfigs(repository);

    const data = await useCase.execute();

    res.status(200).send(data);
};
