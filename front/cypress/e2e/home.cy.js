describe("Worksite List Display", () => {
	beforeEach(() => {
		cy.loginByApi();
		cy.visit("/");
		cy.contains("Chargement des infos...", { timeout: 10000 }).should("not.exist");
	});

	it("Should display at least one worksite", () => {
		cy.get(".worksiteContainer a h3.text-lg.font-bold.text-primary.underline.cursor-pointer")
			.should("have.length.gte", 1)
			.first()
			.invoke("text")
			.then((text) => {
				expect(text.trim().length).to.be.greaterThan(0);
				cy.log("Premier chantier affiché :", text);
			});
	});

	it("Should not display empty state message", () => {
		cy.get(".worksiteContainer p.text-center.text-gray-500").should("not.exist");
	});
});
