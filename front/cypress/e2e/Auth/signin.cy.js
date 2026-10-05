import {
    toastValide,
    toatError,
    btnValide,
    mediumDelay,
    hardDelay,
    lowDelay,
    userEmail,
    userPassword,
} from "../cy-variable";

describe("User should login", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("signin"));
    });

    it("Check form not empty", () => {
        cy.get('[data-cy-error="email"]').should("not.exist");
        cy.get('[data-cy-error="password"]').should("not.exist");
        cy.wait(hardDelay);
        cy.get(btnValide).click();
        cy.get('[data-cy-error="email"]').should("exist");
        cy.get('[data-cy-error="password"]').should("exist");
        cy.wait(hardDelay);
    });

    it("Check email is valid", () => {
        cy.get(toatError).should("not.exist");
        cy.get("input[role=email]").type("xxxx@gmail.com", {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type("Fertis8795&&", {
            delay: lowDelay,
        });
        cy.wait(hardDelay);
        cy.get(btnValide).click();
        cy.get(toatError).should("exist");
        cy.wait(hardDelay);
    });

    it("Check password is valid", () => {
        cy.get(toatError).should("not.exist");
        cy.get("input[role=email]").type("axelf@gmail.com", {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type("ezaezaezae&&3", {
            delay: lowDelay,
        });
        cy.wait(hardDelay);
        cy.get(btnValide).click();
        cy.get(toatError).should("exist");
        cy.wait(hardDelay);
    });

    it("User should login", () => {
        cy.get(toastValide).should("not.exist");
        cy.get("input[role=email]").type(userEmail, {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type(userPassword, {
            delay: lowDelay,
        });
        cy.wait(hardDelay);
        cy.get(btnValide).click();
        cy.get(toastValide).should("exist");
        cy.url().should("include", "/");
        cy.wait(hardDelay);
    });
});
