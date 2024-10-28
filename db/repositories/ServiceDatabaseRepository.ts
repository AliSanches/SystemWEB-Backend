import { ICreateService, IUpdateService } from "../../entities/Service";
import { ServiceRepository } from "../contracts/ServiceRepository";
import { prismaClient } from "../prismaClient";

export class ServiceDatabaseRepository implements ServiceRepository {
	create = async (data: ICreateService) => {
		const query = await prismaClient.service.create({
			data,
		});

		return query;
	};

	listAll = async () => {
		const query = await prismaClient.service.findMany({
			include: {
				_count: {
					select: {
						processes: true,
					},
				},
			},
		});

		return query;
	};

	listEnabled = async () => {
		const query = await prismaClient.service.findMany({
			where: {
				enabled: true
			},
			include: {
				_count: {
					select: {
						processes: true,
					},
				},
			},
		});

		return query;
	};

	update = async (data: IUpdateService) => {
		const query = await prismaClient.service.update({
			where: {
				id: data.id,
			},
			data,
		});

		return query;
	};

	delete = async (id: number) => {
		const query = await prismaClient.service.delete({
			where: {
				id,
			},
		});

		return query;
	};
}
