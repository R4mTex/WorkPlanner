import {
    toastValide,
    btnValide,
    planning,
    addTask,
    lowDelay,
    mediumDelay,
    hardDelay,
    userPassword,
    userEmail,
} from "../cy-variable";
describe("User should be able to create a task", () => {
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 16);

    beforeEach(() => {
        cy.visit(Cypress.env("signin"));
    });

    it("Form is not empty", () => {
        cy.get("input[role=email]").type(userEmail, {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type(userPassword, {
            delay: lowDelay,
        });
        cy.wait(hardDelay);
        cy.get(btnValide).click();
        cy.get(toastValide).should("exist");
        cy.wait(mediumDelay);
        cy.url().should("include", "/");
        cy.get(planning).first().click();
        cy.wait(mediumDelay);
        cy.get(addTask).first().click();
        cy.wait(hardDelay);
        cy.get('[data-cy-error="name"]').should("not.exist");
        cy.get('[data-cy-error="status"]').should("not.exist");
        cy.get('[data-cy-error="start"]').should("not.exist");
        cy.get('[data-cy-error="end"]').should("not.exist");
        cy.get('[data-cy-error="duration"]').should("not.exist");
        cy.get('[data-cy-error="description"]').should("not.exist");
        cy.get(btnValide).first().click();
        cy.wait(hardDelay);
        cy.get('[data-cy-error="name"]').should("exist");
        cy.get('[data-cy-error="status"]').should("exist");
        cy.get('[data-cy-error="start"]').should("exist");
        cy.get('[data-cy-error="end"]').should("exist");
        cy.get('[data-cy-error="duration"]').should("exist");
        cy.get('[data-cy-error="description"]').should("exist");
    });

    it("User should be able to create a new tasks", () => {
        cy.get(toastValide).should("not.exist");
        cy.get("input[role=email]").type(userEmail, {
            delay: lowDelay,
        });
        cy.get("input[role=password]").type(userPassword, {
            delay: lowDelay,
        });
        cy.get(btnValide).click();
        cy.get(toastValide).should("exist");
        cy.url().should("include", "/");
        cy.get(planning).first().click();
        cy.get(addTask).first().click();
        cy.get("input[role=name]").type("Test task", { delay: lowDelay });
        cy.get("select").select("InProgress");
        cy.get("input[role=start]").type(formattedDateTime);
        cy.get("input[role=end]").type(formattedDateTime);
        cy.get("input[role=duration]").type(1, { delay: lowDelay });
        cy.get("textarea[role=description]").type(
            "sum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        );
        cy.wait(hardDelay);
        cy.get(btnValide).first().click();
        cy.get(toastValide).should("exist");
    });
});
