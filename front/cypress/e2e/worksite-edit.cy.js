describe("Worksite Edition", () => {
	beforeEach(() => {
		cy.loginByApi();
		cy.visit("/");
		cy.contains("Chargement des infos...", { timeout: 10000 }).should("not.exist");

		cy.get(".worksiteContainer a h3.text-lg.font-bold.text-primary.underline.cursor-pointer").first().click();
		cy.url().should("match", /\/worksite\/\d+\/details\/$/);
		cy.contains("button", "Modifier").click();
		cy.url().should("match", /\/worksite\/\d+\/modification\/$/);
	});

	it("Should update worksite form and reflect changes", () => {
		const filePath = "images/workers-examining-work.jpg";
		cy.get("input[placeholder='Ajouter une image']").attachFile(filePath);

		cy.get("input[placeholder='Nom du chantier']").clear().type("Chantier modifié");
		cy.get("textarea[placeholder='Description']").clear().type("Nouvelle description test");

		cy.get("input[type='datetime-local']").eq(0).clear().type("2025-06-01T08:00");
		cy.get("input[type='datetime-local']").eq(1).clear().type("2025-06-03T18:00");

		cy.get("input[placeholder='Numéro de rue']").clear().type("12");
		cy.get("input[placeholder='Nom de la rue']").clear().type("Rue des tests");
		cy.get("input[placeholder='Code postal']").clear().type("75001");
		cy.get("input[placeholder='Pays']").clear().type("France");
		cy.get("input[placeholder='Ville']").clear().type("Paris");

		cy.contains("button", "Enregistrer les modifications").click();

		cy.url().should("match", /\/worksite\/\d+\/details\/$/);

		cy.get("img[src*='workers-examining-work.jpg']").should("be.visible");

		cy.contains("Chantier modifié").should("exist");
		cy.contains("Nouvelle description test").should("exist");

		cy.contains("01/06/2025 08:00").should("exist");
		cy.contains("03/06/2025 18:00").should("exist");

		cy.contains("Rue des tests").should("exist");
		cy.contains("75001").should("exist");
		cy.contains("FRANCE").should("exist");
		cy.contains("Paris").should("exist");
	});
});
