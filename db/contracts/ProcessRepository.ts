import { ICreateProcess, IUpdateProcess, TProcess } from "../../entities/Process";

export interface ProcessRepository {
	create(process: ICreateProcess, userId: number): Promise<TProcess>;
	list(customerId: number): Promise<TProcess[]>;
	update(process: IUpdateProcess, processId: number): Promise<TProcess>;
	finish(processId: number, userId: number, text: string): Promise<TProcess>;
	reopen(processId: number, text: string, userId: number): Promise<TProcess>;
	get(processId: number): Promise<TProcess | null>;
	delete(id: number): Promise<any>;
}
