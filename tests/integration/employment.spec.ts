let createdEmployments: Array<any> = [];

let createEmploymentData = {
	company: "Employment 1",
	position: "Position 1",
	startDate: new Date("2010-01-01"),
	endDate: new Date("2020-01-01"),
	periodIsSpecial: false,
	considerGracePeriod: false,
	customerId: 1,
};

describe("Employment integration tests ▼", () => {
	var token: string;

	beforeAll(async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD }),
		});
		const body = await response.json();
		token = body.token;
	});

	it("should successfully create a new employment", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/employment/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(createEmploymentData),
		});

		expect(response.status).toBe(201);
		const body = await response.json();

		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("company");
		expect(body).toHaveProperty("position");
		expect(body).toHaveProperty("createdAt");
		expect(body).toHaveProperty("updatedAt");
		expect(body).toHaveProperty("startDate");
		expect(body).toHaveProperty("endDate");
		expect(body).toHaveProperty("considerGracePeriod");
		expect(body).toHaveProperty("customerId");

		createdEmployments.push(body);
	});

	it("should successfully create a new employment and calculate the grace period", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/employment/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ ...createEmploymentData, considerGracePeriod: true }),
		});

		expect(response.status).toBe(201);
		const body = await response.json();

		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("company");
		expect(body).toHaveProperty("position");
		expect(body).toHaveProperty("createdAt");
		expect(body).toHaveProperty("updatedAt");
		expect(body).toHaveProperty("startDate");
		expect(body).toHaveProperty("endDate");
		expect(body).toHaveProperty("considerGracePeriod");
		expect(body).toHaveProperty("customerId");

		createdEmployments.push(body);
	});

	it("should not be able create a new employment, with missing data", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/employment/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ ...createEmploymentData, endDate: undefined }),
		});

		expect(response.status).toBe(400);
	});

	it("should successfully return an employment", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/employment/get/${createdEmployments[0].id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		expect(response.status).toBe(200);
	});

	it("should successfully update a given employment", async () => {
		let employment = createdEmployments[0];
		delete employment.createdAt;
		delete employment.updatedAt;
		delete employment.durationYears;
		delete employment.durationMonths;
		delete employment.durationDays;
		delete employment.customerId;

		const response = await fetch(`${process.env.BACKEND_URL}/employment/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ ...employment, company: "Updated Company" }),
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("company");
		expect(body).toHaveProperty("position");
		expect(body).toHaveProperty("createdAt");
		expect(body).toHaveProperty("updatedAt");
		expect(body).toHaveProperty("startDate");
		expect(body).toHaveProperty("considerGracePeriod");
		expect(body).toHaveProperty("customerId");
		expect(body.company).toBe("Updated Company");
	});

	it("should return and array of the employments of a given customer", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/employment/list/${createEmploymentData.customerId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body.employments.length).toBeGreaterThanOrEqual(1);
		expect(body.gracePeriodMonths).toBeGreaterThanOrEqual(0);
	});

	it("should successfully delete both created employments", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/employment/delete/${createdEmployments[0].id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		const response2 = await fetch(`${process.env.BACKEND_URL}/employment/delete/${createdEmployments[1].id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		expect(response.status).toBe(200);
		expect(response2.status).toBe(200);
	});
});
