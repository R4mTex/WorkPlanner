import { faker } from "@faker-js/faker";
import {
    toastValide,
    toatError,
    btnValide,
    planning,
    lowDelay,
    hardDelay,
    mediumDelay,
    userPassword,
    userEmail,
} from "../cy-variable";
describe("User should be able to edit a task", () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const formattedDateTime = tomorrow.toISOString().slice(0, 16);
    const name = faker.commerce.productName();
    const status = ["InProgress", "Finished"];

    beforeEach(() => {
        cy.visit(Cypress.env("signin"));
    });

    it("User should be able to edit a task", () => {
        cy.get("input[role=email]").type(userEmail, {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type(userPassword, {
            delay: lowDelay,
        });
        cy.get(btnValide).click();
        cy.get(toastValide).should("exist");
        cy.wait(mediumDelay);
        cy.url().should("include", "/");
        cy.wait(hardDelay);
        cy.get(planning).first().click();
        cy.wait(mediumDelay);
        cy.get('[data-cy-btn="voir"]').first().click();
        cy.wait(mediumDelay);
        cy.get('[data-cy-btn="voir"]').first().click();
        cy.wait(mediumDelay);
        cy.get('[data-cy-btn="modifier"]').first().click();
        cy.get("input[role=name]").clear();
        cy.get("input[role=name]").type(name, {
            delay: lowDelay,
        });
        cy.get("select").select(faker.helpers.arrayElement(status));
        cy.get("input[role=end]").type(formattedDateTime);
        cy.wait(hardDelay);
        cy.get(btnValide).first().click();
        cy.get(toastValide).should("exist");
    });
});
