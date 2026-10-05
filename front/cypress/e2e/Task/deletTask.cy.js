import {
    toastValide,
    toatError,
    btnValide,
    planning,
    lowDelay,
    hardDelay,
    userPassword,
    userEmail,
} from "../cy-variable";
describe("User should be able to delete a task", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("signin"));
    });

    it("Should delete task", () => {
        cy.get("input[role=email]").type(userEmail, {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type(userPassword, {
            delay: lowDelay,
        });
        cy.wait(hardDelay);
        cy.get(btnValide).click();
        cy.get(toastValide).should("exist");
        cy.wait(hardDelay);
        cy.url().should("include", "/");
        cy.get(planning).first().click();
        cy.wait(hardDelay);
        cy.get('[data-cy-btn="voir"]').first().click();
        cy.get('[data-cy-btn="voir"]').first().click();
        cy.get('[data-cy-btn="delete"]').first().click();
        cy.wait(hardDelay);
        cy.get(btnValide).first().click();
    });
});
