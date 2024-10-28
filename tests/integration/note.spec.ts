describe("Process integration tests ▼", () => {
	let token = "";
	const mockProcess = {
		id: Math.floor(Math.random() * (40 - 10)),
		createdAt: new Date(),
		updatedAt: new Date(),
		startDate: new Date(),
		endDate: null,
		name: "process 1",
		customerId: 1,
		serviceId: 12,
	};

	const note = {
		id: Math.floor(Math.random() * (40 - 10)),
		createdAt: new Date(),
		updatedAt: new Date(),
		userId: 1,
		title: "note 1",
		text: "note 1",
		processId: 1,
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

	it("should list the process's notes", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/note/list/2`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body.length).toBeGreaterThanOrEqual(1);
	});

	it("should create a new note", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/note`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ ...note, processId: 2 }),
		});

		expect(response.status).toBe(200);
		const body = await response.json();
	});
});
