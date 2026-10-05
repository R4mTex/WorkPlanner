import { faker } from "@faker-js/faker";
import {
    toastValide,
    toatError,
    btnValide,
    lowDelay,
    mediumDelay,
    hardDelay,
} from "../cy-variable";
const email = faker.internet.email();

describe("User should create an account then redirect to signin", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("signup"));
    });

    it("Check form not empty", () => {
        cy.get('[data-cy-error="email"]').should("not.exist");
        cy.get('[data-cy-error="password"]').should("not.exist");
        cy.get(btnValide).click();
        cy.wait(hardDelay);
        cy.get('[data-cy-error="email"]').should("exist");
        cy.get('[data-cy-error="password"]').should("exist");
        cy.wait(hardDelay);
    });

    it("Check email is new", () => {
        cy.get(toatError).should("not.exist");
        cy.get("input[role=email]").type("agmail@gmail.com", {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type("Fertis8795&&", {
            delay: lowDelay,
        });
        cy.get("input[role=password_confirm]").type("Fertis8795&&", {
            delay: lowDelay,
        });
        cy.get(btnValide).click();
        cy.wait(hardDelay);
        cy.get(toatError).should("exist");
        cy.wait(hardDelay);
    });

    it("Check same password", () => {
        cy.get('[data-cy-error="password_confirm"]').should("not.exist");
        cy.get("input[role=email]").type("agmail@gmail.com", {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type("Fertis8795&&", {
            delay: lowDelay,
        });
        cy.get("input[role=password_confirm]").type("Fertis8795&&1", {
            delay: lowDelay,
        });
        cy.wait(hardDelay);
        cy.get(btnValide).click();
        cy.get('[data-cy-error="password_confirm"]').should("exist");
        cy.wait(hardDelay);
    });

    it("User should create an account then redirect to signin", () => {
        cy.get(toastValide).should("not.exist");
        cy.get("input[role=email]").type(email);
        cy.get("input[role=password]").type("Fertis8795&&", {
            delay: lowDelay,
        });
        cy.get("input[role=password_confirm]").type("Fertis8795&&", {
            delay: lowDelay,
        });
        cy.get(btnValide).click();
        cy.wait(hardDelay);
        cy.get(toastValide).should("exist");
        cy.url().should("include", "/signin");
        cy.wait(hardDelay);
    });
});
