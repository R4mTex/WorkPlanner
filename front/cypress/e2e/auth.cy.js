describe("Should login user via API and receive access and refresh tokens in set-cookie headers", () => {
	it("Should login successfully and set auth cookies", () => {
		cy.request({
			method: "POST",
			url: "http://localhost:3000/login",
			body: {
				email: "Cristopher_Gleichner74@yahoo.com",
				password: "test",
			},
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(201);

			expect(response.body).to.have.property("user");
			expect(response.body.user).to.not.have.property("password");
			expect(response.body.user).to.not.have.property("hashedRefreshToken");

			cy.getCookie("access_token").should("exist");
			cy.getCookie("refresh_token").should("exist");
		});
	});

	it("Should fail login with wrong credentials", () => {
		cy.request({
			method: "POST",
			url: "http://localhost:3000/login",
			failOnStatusCode: false,
			body: {
				email: "nonExistent@example.com",
				password: "wrongPassword",
			},
		}).then((response) => {
			expect(response.status).to.eq(401);
		});
	});
});
