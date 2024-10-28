import { Request, Response } from "express";
import { CreateEmployment } from "../../app/employment/CreateEmployment";
import { EmploymentDatabaseRepository } from "../../db/repositories/EmploymentDatabaseRepository";
import { GetEmployment } from "../../app/employment/GetEmployment";
import { UpdateEmployment } from "../../app/employment/UpdateEmployment";
import { DeleteEmployment } from "../../app/employment/DeleteEmployment";
import { ListEmployment } from "../../app/employment/ListEmployment";
import { CNISParser } from "../../app/employment/CNISParser";

export const create = async (req: Request, res: Response): Promise<void> => {
    const employmentRepository = new EmploymentDatabaseRepository();
    const createEmployment = new CreateEmployment(employmentRepository);
    const createdEmployment = await createEmployment.execute({
        ...req.body.data,
        customerId: req.body.data.customerId,
    });

    res.status(201).json(createdEmployment);
};

export const get = async (req: Request, res: Response): Promise<void> => {
    const employmentRepository = new EmploymentDatabaseRepository();
    const getEmployment = new GetEmployment(employmentRepository);
    const employment = await getEmployment.execute(req.body.data.id, req.body.user);

    res.status(200).json(employment);
};

export const list = async (req: Request, res: Response): Promise<void> => {
    const employmentRepository = new EmploymentDatabaseRepository();
    const listEmployment = new ListEmployment(employmentRepository);

    const list = await listEmployment.execute(+req.params.customerId, req.body.user);

    res.status(200).json(list);
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const employmentRepository = new EmploymentDatabaseRepository();
    const updateEmployment = new UpdateEmployment(employmentRepository);
    const employment = await updateEmployment.execute(req.body.data, req.body.user);

    res.status(200).json(employment);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const employmentRepository = new EmploymentDatabaseRepository();
    const deleteEmployment = new DeleteEmployment(employmentRepository);
    await deleteEmployment.execute(req.body.data.id, req.body.user);

    res.status(200).send();
};

type UploadCnisRequest = Request & {
    file: any;
};
export const uploadCnis = async (req: UploadCnisRequest, res: Response): Promise<void> => {
    if (req.file) {
        let cnisArray = await CNISParser.parse(req.file.buffer);

        const employmentRepository = new EmploymentDatabaseRepository();
        const createEmployment = new CreateEmployment(employmentRepository);

        const customerId = +req.params.customerId;

        for (let cnis in cnisArray) {
            await createEmployment.execute({ ...cnisArray[cnis], customerId });
        }

        cnisArray.length >= 1 ? res.status(200).json(cnisArray) : res.status(422).send();
    } else {
        res.status(400).send();
    }
};

