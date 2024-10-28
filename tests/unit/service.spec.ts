import { CreateService } from "../../app/service/CreateService";
import { UpdateService } from "../../app/service/UpdateService";
import { ListServices } from "../../app/service/ListServices";
import { ServiceDatabaseRepository } from "../../db/repositories/ServiceDatabaseRepository";
import { mock } from "jest-mock-extended";

const service = {
	id: Math.floor(Math.random() * (40 - 10)),
	createdAt: new Date(),
	updatedAt: new Date(),
	name: "test",
};

describe("Customer unit tests ▼", () => {
	it("should return the created service", async () => {
		const serviceRepository = mock<ServiceDatabaseRepository>();
		serviceRepository.create.mockResolvedValue(service);

		const createService = new CreateService(serviceRepository);
		const newService = await createService.execute({ name: service.name });

		expect(newService).toMatchObject(service);
	});

	it("should return the updated customer", async () => {
		const serviceRepository = mock<ServiceDatabaseRepository>();
		serviceRepository.update.mockResolvedValue(service);

		const updateService = new UpdateService(serviceRepository);
		const newService = await updateService.execute({ name: service.name, id: service.id });

		expect(newService).toMatchObject(service);
	});

	it("should return an array of services", async () => {
		const serviceRepository = mock<ServiceDatabaseRepository>();
		serviceRepository.list.mockResolvedValue(new Array(10).fill(service));
		const listServices = new ListServices(serviceRepository);

		const services = await listServices.execute();

		expect(services.length).toBeGreaterThanOrEqual(10);
		expect(services[0]).toMatchObject(service);
	});
});
