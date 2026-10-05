describe("Worksite Deletion", () => {
	beforeEach(() => {
		cy.loginByApi();
		cy.visit("/");
		cy.contains("Chargement des infos...", { timeout: 10000 }).should("not.exist");

		cy.get(".worksiteContainer a h3.text-lg.font-bold.text-primary.underline.cursor-pointer").first().click();
		cy.url().should("match", /\/worksite\/\d+\/details\/$/);
		cy.get("h1.text-4xl.font-semibold.text-primary").should("exist");
	});

	it("Should delete the first worksite successfully", () => {
		// Cliquer sur le bouton delete via data-testid
		cy.get('[data-cy-delete-button="delete-button"]').click();

		// Vérifier que la modal s'ouvre en cherchant un texte de la modale
		cy.contains("Etes-vous certain de vouloir supprimer").should("be.visible");

		// Cliquer sur le bouton valider pour confirmer la suppression
		cy.get('[data-cy-confirm-delete-button="confirm-delete"]').click();

		// Vérifier la redirection vers la home page ("/")
		cy.url().should("eq", `${Cypress.config().baseUrl}/`);

		// Vérifier que la notification de succès apparaît (adapter le selecteur si besoin)
		cy.contains("Suppression effectuée").should("be.visible");

		// Optionnel : vérifier que le chantier supprimé n’est plus dans la liste
		// Attention : tu devras sauvegarder le nom avant suppression si tu veux vérifier précisément
	});
});
