import { prismaClient } from "../prismaClient";
import ConfigsRepository from "./../contracts/ConfigsRepository";

export class ConfigsDatabaseRepository implements ConfigsRepository {

	get = async (): Promise<any> => {
		const query = await prismaClient.config.findFirst();

		return query;
	};

	update = async (data): Promise<any> => {
		const query = await prismaClient.config.update({
			where: {
				id: 1,
			},
			data: {
				empresa: data.empresa,
				cnpj: data.cnpj,
				razaoSocial: data.razaoSocial,
				registroEstadual: data.registroEstadual,
				registroMunicipal: data.registroMunicipal,
				postalCode: data.postalCode,
				state: data.state,
				city: data.city,
				neighborhood: data.neighborhood,
				street: data.street,
				buildingNumber: data.buildingNumber,
			},
		});

		return query;
	};
}
