import { ICreateEmployment, IUpdateEmployment, TEmployment } from "../../entities/Employment";

export interface EmploymentRepository {
	create(employment: ICreateEmployment): Promise<TEmployment>;
	get(id: number): Promise<TEmployment>;
	list(customerId: number): Promise<TEmployment[]>;
	update(employment: IUpdateEmployment): Promise<TEmployment>;
	delete(id: number): Promise<boolean>;
}
