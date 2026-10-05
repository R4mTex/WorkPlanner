describe("Worksite Navigation", () => {
	beforeEach(() => {
		cy.loginByApi();
		cy.visit("/");
		cy.contains("Chargement des infos...", { timeout: 10000 }).should("not.exist");
	});

	it("Should redirect to the worksite details page", () => {
		cy.get(".worksiteContainer a h3.text-lg.font-bold.text-primary.underline.cursor-pointer").first().click();
		cy.url().should("match", /\/worksite\/\d+\/details\/$/);
		cy.get("h1.text-4xl.font-semibold.text-primary", { timeout: 10000 }).should("exist");
	});
});
