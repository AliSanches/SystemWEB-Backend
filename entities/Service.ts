export type TService = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
};

export interface ICreateService extends Omit<TService, "id" | "createdAt" | "updatedAt"> {}

export interface IUpdateService extends Partial<TService> {
	id: number;
	name: string;
	enabled: boolean;
}
