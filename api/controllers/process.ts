import { ProcessDatabaseRepository } from "../../db/repositories/ProcessDatabaseRepository";
import { CreateProcess } from "../../app/process/CreateProcess";
import { Request, Response } from "express";
import { DeleteProcess } from "../../app/process/DeleteProcess";

interface IProcessRequest extends Request {
	user: any;
}

export const get = async (req: Request, res: Response): Promise<void> => {
	const { processId } = req.params;

	const processRepository = new ProcessDatabaseRepository();
	const process = await processRepository.get(+processId);
	res.status(200).json(process);
};
export const create = async (req: IProcessRequest, res: Response): Promise<void> => {
	const processRepository = new ProcessDatabaseRepository();
	const createProcess = new CreateProcess(processRepository);

	const process = await createProcess.execute(req.body.data, +req.user.id);
	res.status(201).json(process);
};

export const list = async (req: Request, res: Response): Promise<void> => {
	const processRepository = new ProcessDatabaseRepository();
	const processes = await processRepository.list(+req.params.customerId);
	res.status(200).json(processes);
};

export const update = async (req: Request, res: Response): Promise<void> => {
	const { processId } = req.params;

	const processRepository = new ProcessDatabaseRepository();
	const process = await processRepository.update(req.body, +processId);
	res.status(200).json(process);
};

export const finish = async (req: IProcessRequest, res: Response): Promise<void> => {
	const { processId } = req.params;

	const processRepository = new ProcessDatabaseRepository();
	const process = await processRepository.finish(+processId, req.user.id, req.body.texto);
	res.status(200).json(process);
};

export const reopen = async (req: IProcessRequest, res: Response): Promise<void> => {
	const { processId } = req.params;

	const processRepository = new ProcessDatabaseRepository();
	const process = await processRepository.reopen(+processId, req.body.texto, req.user.id);
	res.status(200).json(process);
};

export const remove = async (req: Request, res: Response) => {
	const repository = new ProcessDatabaseRepository();
	const deleteService = new DeleteProcess(repository);

	await deleteService.execute(+req.params.id);

	res.status(200).send();
};
