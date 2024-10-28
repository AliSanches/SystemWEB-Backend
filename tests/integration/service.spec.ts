describe("Services integration tests ▼", () => {
	let token = "";
	let createdService: any = {};

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

	it("should successfully create a new service", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/service`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "Testing",
			}),
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(typeof body).toBe("object");
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("name");
		createdService = body;
	});

	it("should successfully update the created service", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/service`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "Testing 2",
				id: createdService.id,
			}),
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(typeof body).toBe("object");
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("name");
		//createdService = body;
	});
});
