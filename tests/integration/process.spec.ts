describe("Process integration tests ▼", () => {
	let token = "";
	let createdService: any = {};
	const mockProcess = {
		id: Math.floor(Math.random() * (40 - 10)),
		createdAt: new Date(),
		updatedAt: new Date(),
		startDate: new Date(),
		endDate: null,
		name: "process 1",
		customerId: 1,
		serviceId: 1,
	};

	beforeAll(async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: process.env.TEST_EMAIL,
				password: process.env.TEST_PASSWORD,
			}),
		});

		const body = await response.json();
		token = body.token;
	});

	it("should successfully start a new process", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/process`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: mockProcess.name,
				customerId: mockProcess.customerId,
				serviceId: mockProcess.serviceId,
			}),
		});

		expect(response.status).toBe(201);
		const body = await response.json();
		expect(typeof body).toBe("object");
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("name");
		expect(body).toHaveProperty("customerId");
		expect(body).toHaveProperty("serviceId");
		expect(body).toHaveProperty("startDate");
		expect(body).toHaveProperty("endDate");
		expect(body).toHaveProperty("createdAt");
		expect(body).toHaveProperty("updatedAt");
		//createdService = body;
	});

	it("should update a process", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/process/2`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify({
				name: mockProcess.name,
				customerId: mockProcess.customerId,
				serviceId: mockProcess.serviceId
			})
		})

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("name");
		expect(body).toHaveProperty("customerId");
		expect(body).toHaveProperty("serviceId");
	})
});
