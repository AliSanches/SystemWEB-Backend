import { Request, Response } from "express";
import { CreateService } from "../../app/service/CreateService";
import { ServiceDatabaseRepository } from "../../db/repositories/ServiceDatabaseRepository";
import { ListServices } from "../../app/service/ListServices";
import { DeleteService } from "../../app/service/DeleteService";
import { UpdateService } from "../../app/service/UpdateService";

export const create = async (req, res: Response) => {
	const serviceRepository = new ServiceDatabaseRepository();
	const createService = new CreateService(serviceRepository);
	const data = req.body.data;

	const service = await createService.execute({ name: data.name });
	return res.json(service);
};

export const list = async (req, res: Response) => {
	const serviceRepository = new ServiceDatabaseRepository();
	const listServices = new ListServices(serviceRepository);

	const services = req.params.all ? await listServices.all() : await listServices.enabled();
	return res.json(services);
};

export const update = async (req: Request, res: Response) => {
	const serviceRepository = new ServiceDatabaseRepository();
	const updateService = new UpdateService(serviceRepository);

	const data = req.body.data;
	const service = await updateService.execute(data);

	return res.json(service);
};

export const remove = async (req: Request, res: Response) => {
	const repository = new ServiceDatabaseRepository();
	const useCase = new DeleteService(repository);

	await useCase.execute(+req.params.id);

	res.status(200).send();
};
