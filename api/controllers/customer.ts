import { ListCustomers } from "../../app/customer/ListCustomers";
import { CreateCustomer } from "../../app/customer/CreateCustomer";
import { CustomerDatabaseRepository } from "../../db/repositories/CustomerDatabaseRepository";
import { Request, Response } from "express";
import { UpdateCustomer } from "../../app/customer/UpdateCustomer";
import { DeleteCustomer } from "../../app/customer/DeleteCustomer";
import { GetCustomer } from "../../app/customer/GetCustomer";
import child_process from "child_process";

import path from "path";
import fs from "fs";

interface ICustomerRequest extends Request {
    body: any;
    user: {
        id: number;
        name: string;
    };
}

export const list = async (req: ICustomerRequest, res: Response): Promise<void> => {
    const number = parseInt(req.body.number);
    const search = req.body.search;

    const customerRepository = new CustomerDatabaseRepository();
    const listCustomers = new ListCustomers(customerRepository);
    const data = await listCustomers.execute(search, number);

    res.status(200).json(data);
};

export const create = async (req: ICustomerRequest, res: Response): Promise<void> => {
    const customerData = req.body;

    const customerRepository = new CustomerDatabaseRepository();
    const createCustomer = new CreateCustomer(customerRepository);
    const customer = await createCustomer.execute(customerData);

    res.status(201).json(customer);
};

export const get = async (req: Request, res: Response): Promise<void> => {
    const customerRepository = new CustomerDatabaseRepository();
    const getCustomer = new GetCustomer(customerRepository);

    let espacoUtilizado = child_process.execSync("du -m uploads", { stdio: "pipe", encoding: "utf8" });
    espacoUtilizado = espacoUtilizado.trim().split("M")[0];
    espacoUtilizado = espacoUtilizado.split("\t")[0];

    //in megabytes
    let espacoContratado = 1024;

    let porcentagemDeUso = (+espacoUtilizado / espacoContratado) * 100;
    porcentagemDeUso = Math.floor(porcentagemDeUso);

    const customer = await getCustomer.execute(req.body.data.id);
    res.status(200).json({ ...customer, espacoContratado, espacoUtilizado: +espacoUtilizado, porcentagemDeUso });
};

export const update = async (req: ICustomerRequest, res: Response): Promise<void> => {
    const customerRepository = new CustomerDatabaseRepository();
    const updateCustomer = new UpdateCustomer(customerRepository);

    const updatedCustomer = await updateCustomer.execute(req.body);

    res.status(200).json(updatedCustomer);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const customerRepository = new CustomerDatabaseRepository();
    const deleteCustomer = new DeleteCustomer(customerRepository);
    const id = parseInt(req.body.data.id);

    await deleteCustomer.execute(id, req.body.user);

    res.status(200).send();
};

export const upload = async (req: Request, res: Response): Promise<void> => {
    const repository = new CustomerDatabaseRepository();
    const { customerId } = req.params;
    const file = req.file!;

    await repository.attachFile(+customerId, file.filename, file.originalname, req.body.description);

    res.sendStatus(200);
};

export const download = async (req: Request, res: Response): Promise<void> => {
    const repository = new CustomerDatabaseRepository();
    const { fileId } = req.params;

    const fileData = await repository.getAttachment(+fileId);

    let pt = path.join(__dirname, "..", "..", "..", "uploads", fileData!.name);
    let file = fs.readFileSync(pt);

    res.setHeader("Content-Disposition", `attachment; filename="${fileData?.original_name}"`);
    res.send(file);
};

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
    const repository = new CustomerDatabaseRepository();
    const { fileId } = req.params;

    const file = await repository.getAttachment(+fileId);

    let pt = path.join(__dirname, "..", "..", "..", "uploads", file!.name);
    fs.unlinkSync(pt);

    await repository.deleteFile(+fileId);

    res.sendStatus(200);
};

export const renameFile = async (req: Request, res: Response) => {
    const repository = new CustomerDatabaseRepository();
    const { fileId } = req.params;
    const { description } = req.body;

    const file = await repository.renameFile(+fileId, description);

    res.json(file);
};

