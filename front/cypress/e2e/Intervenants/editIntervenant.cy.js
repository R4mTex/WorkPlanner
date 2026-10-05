import { toastValide, toatError, btnValide } from ".../cy-variable";

describe("modifie un intervenant", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/edition/intervenant");
    });
    it("change les infos d'un intervenant", () => {
        const updateFakeIntervenants = [
            {
                firstname: "Moss",
                lastname: "Def",
                email: "pouet@example.com",
                phoneNumber: "0600000000",
                status: "Occupé",
            },
        ];
        cy.intercept("PATCH", "http://localhost:3000/intervenants/:id", {
            statusCode: 200,
            body: {
                id: "1",
                ...updateFakeIntervenants,
                tasks: ["OutdentIcon", "non", "ok"],
            },
        }).as("updateIntervenant");

        cy.get('input[name="firstname"]')
            .clear()
            .type(updateFakeIntervenants.firstname);
        cy.get('input[name="lastname"]')
            .clear()
            .type(updateFakeIntervenants.lastname);
        cy.get('input[name="email"]')
            .clear()
            .type(updateFakeIntervenants.email);
        cy.get('input[name="phoneNumber"]')
            .clear()
            .type(updateFakeIntervenants.phoneNumber);
        cy.get('select[name="status"]').select(updateFakeIntervenants.status);

        cy.get('[data-cy="submit-btn"]').click();

        cy.wait("@updateIntervenant")
            .its("request.body")
            .should("deep.include", updateFakeIntervenants);

        cy.contains(toastValide).should("exist");
    });
});
