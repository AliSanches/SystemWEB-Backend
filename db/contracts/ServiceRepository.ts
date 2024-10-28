import { ICreateService, IUpdateService, TService } from "../../entities/Service";

export interface ServiceRepository {
	create(service: ICreateService): Promise<TService>;
	listAll(): Promise<TService[]>;
	listEnabled(): Promise<TService[]>;
	update(service: IUpdateService): Promise<TService>;
	delete(id: number): Promise<any>;
}
