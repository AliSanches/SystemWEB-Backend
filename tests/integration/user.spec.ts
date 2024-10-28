describe("User integration tests ▼", () => {
	let token = "";
	let createdUser: any = {};

	it("should authenticate the user", async () => {
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

		expect(response.status).toBe(200);
		const body = await response.json();

		expect(body).toHaveProperty("token");
		token = body.token;
	});

	it("should not authenticate the user with wrong credentials", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: `teste@teste.com`,
				password: "password",
			}),
		});

		expect(response.status).toBe(401);
	});

	it("should successfully create a new user", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "User Name",
				email: `user${Math.random()}@mail.com`,
				password: "123",
			}),
		});

		expect(response.status).toBe(201);
		const body = await response.json();

		expect(typeof body).toBe("object");
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("name");
		expect(body).toHaveProperty("email");
		expect(body.password).toBeFalsy();
		createdUser = body;
	});

	it("should not create a user with a malformed request", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "User Name",
				email: `user${Math.random()}@mail.com`,
			}),
		});

		expect(response.status).toBe(400);
	});

	it("should not create a user with an existing email", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "User Name",
				email: createdUser.email,
				password: "123",
			}),
		});

		expect(response.status).toBe(422);
	});

	it("should successfully update the user", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/update?userId=${createdUser.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "Teste",
				email: `mailchimp${Math.random()}@mail.com`,
				password: "123123123",
			}),
		});

		expect(response.status).toBe(200);
	});

	it("should not allow to change the email to one that is already in use", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/update?userId=${createdUser.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "Teste",
				email: `teste@teste.com`,
				password: "123123123",
			}),
		});

		expect(response.status).toBe(422);
		const message = await response.json();
		expect(message).toBe("Email já cadastrado");
	});

	it("should successfully delete the user", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/user/delete?userId=${createdUser.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		expect(response.status).toBe(200);
	});
});
