describe("Customer integration tests ▼", () => {
	let token = "";
	let createdCustomer: any = {};

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

	it("should successfully create a new customer", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/customer/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "John Doe",
				motherName: "Luzinet",
				cpf: "8976524514",
				rg: "5942688876",
				rgIssuer: "Santa Catarina",
				cep: "13444444",
				uf: "SP",
				city: "Piracicaba",
				neighborhood: "Bairro Alto",
				street: "Alguma",
				mail: "teste@teste.com.br",
				phone: "3413222222",
				birthplace: "teste",
				profession: "Tecnologia da Informação",
				civil: "C",
				customerSince: new Date(),
				birthdate: new Date(),
				gender: "M",
			}),
		});

		expect(response.status).toBe(201);
		const body = await response.json();
		expect(typeof body).toBe("object");
		
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("name");
		expect(body).toHaveProperty("motherName");
		expect(body).toHaveProperty("cpf");
		expect(body).toHaveProperty("rg");
		expect(body).toHaveProperty("rgIssuer");
		expect(body).toHaveProperty("cep");
		expect(body).toHaveProperty("uf");
		expect(body).toHaveProperty("city");
		expect(body).toHaveProperty("neighborhood");
		expect(body).toHaveProperty("street");
		expect(body).toHaveProperty("mail");
		expect(body).toHaveProperty("phone");
		expect(body).toHaveProperty("birthplace");
		expect(body).toHaveProperty("profession");
		expect(body).toHaveProperty("civil");
		expect(body).toHaveProperty("customerSince");
		expect(body).toHaveProperty("birthdate");
		expect(body).toHaveProperty("gender");
		createdCustomer = body;
	});

	it("should not be able to create a customer with a malformed request", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/customer/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				name: "John Doe",
				birthdate: new Date(),
			}),
		});
		expect(response.status).toBe(400);
	});

	it("should be able to update the created customer", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/customer/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({
				id: createdCustomer.id,
				name: "Mohhamed Salah",
				motherName: "Netiluz",
				cpf: "123123123",
				rg: "23452342412",
				rgIssuer: "Santa Paraiba",
				cep: "1235521",
				uf: "RJ",
				city: "Vitonn",
				neighborhood: "Bairro Alto",
				street: "Alguma",
				mail: "admin@teste.com.br",
				phone: "3413222222",
				birthplace: "Deu certo",
				profession: "Tecnologia da Informação",
				civil: "C",
				customerSince: new Date(),
				birthdate: new Date(),
				gender: "F",
			}),
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(typeof body).toBe("object");
	});

	it("should be able to get the created customer", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/customer/get/${createdCustomer.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(typeof body).toBe("object");
		expect(body).toHaveProperty("id");
		expect(body).toHaveProperty("name");
		expect(body).toHaveProperty("motherName");
		expect(body).toHaveProperty("cpf");
		expect(body).toHaveProperty("rg");
		expect(body).toHaveProperty("rgIssuer");
		expect(body).toHaveProperty("cep");
		expect(body).toHaveProperty("uf");
		expect(body).toHaveProperty("city");
		expect(body).toHaveProperty("neighborhood");
		expect(body).toHaveProperty("street");
		expect(body).toHaveProperty("mail");
		expect(body).toHaveProperty("phone");
		expect(body).toHaveProperty("birthplace");
		expect(body).toHaveProperty("profession");
		expect(body).toHaveProperty("civil");
		expect(body).toHaveProperty("customerSince");
		expect(body).toHaveProperty("birthdate");
		expect(body).toHaveProperty("gender");
	});

	it("should be able to delete the created customer", async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/customer/delete/${createdCustomer.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		expect(response.status).toBe(200);
	});
});
