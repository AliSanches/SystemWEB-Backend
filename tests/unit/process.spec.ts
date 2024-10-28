import { CreateProcess } from "../../app/process/CreateProcess";
import { ProcessDatabaseRepository } from "../../db/repositories/ProcessDatabaseRepository";
import { mock } from "jest-mock-extended";
import {UpdateProcess} from "../../app/process/UpdateProcess";

const process = {
	id: Math.floor(Math.random() * (40 - 10)),
	createdAt: new Date(),
	updatedAt: new Date(),
	startDate: new Date(),
	endDate: null,
	name: "process 1",
	customerId: 1,
	serviceId: 1,
};

describe("Process unit tests ▼", () => {
	it("should return the created process", async () => {
		const processRepository = mock<ProcessDatabaseRepository>();
		processRepository.create.mockResolvedValue(process);

		const createProcess = new CreateProcess(processRepository);
		const newService = await createProcess.execute({
			name: process.name,
			customerId: process.customerId,
			serviceId: process.serviceId,
		});

		expect(newService).toMatchObject(process);
	});

	it("should update the process", async () => {
		const processRepository = mock<ProcessDatabaseRepository>();
		processRepository.update.mockResolvedValue(process);

		const updateProcess = new UpdateProcess(processRepository)
		const query = await updateProcess.execute(process, process.id)

		expect(query).toMatchObject(process)
	})
});
