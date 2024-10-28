export type TProcess = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	startDate: Date;
	endDate: Date | null;
	customerId: number;
	serviceId: number;
	name: string;
};

export interface ICreateProcess extends Omit<TProcess, "id" | "createdAt" | "updatedAt" | "startDate" | "endDate"> {}

export interface IUpdateProcess extends Omit<TProcess, "createdAt" | "updatedAt"> {}
