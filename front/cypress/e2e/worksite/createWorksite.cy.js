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
import { faker } from "@faker-js/faker";
describe("User should be able to create a worksite", () => {
    const picture = faker.image.url();
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const formattedDateTime = tomorrow.toISOString().slice(0, 16);
    beforeEach(() => {
        cy.visit(Cypress.env("signin"));
    });

    it("User should be able to create a new tasks", () => {
        cy.get(toastValide).should("not.exist");
        cy.get("input[role=email]").type(userEmail);
        cy.get("input[role=password]").type(userPassword);
        cy.get(btnValide).click();
        cy.get(toastValide).should("exist");
        cy.url().should("include", "/");
        cy.get('[data-cy="create-worksite"]').first().click();
        cy.get("input[role=name]").type("Test titre");
        cy.get("textarea[role=description]").type("Test description");
        cy.get("select[role=worksiteTypes]").select("Aménagement des combles");
        cy.get("input[role=start]").type(formattedNow);
        cy.get("input[role=end]").type(formattedDateTime);
        cy.get("input[role=streetNumber]").type("15");
        cy.get("input[role=streetName]").type("Street name");
        cy.get("input[role=postalCode]").type(67300);
        cy.get("input[role=pays]").type("France");
        cy.get("input[role=city]").type("Schiltigheim");

        cy.get("input[role=picture]").type(picture);
        cy.get(btnValide).click();
        cy.get(toastValide).should("exist");
        cy.url().should("include", "/");
    });
});

describe("Load Test - Login Performance", () => {
    let app;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("should handle 50 concurrent login requests", async () => {
        const concurrentUsers = 50;
        const promises = [];
        const startTime = Date.now();

        for (let i = 0; i < concurrentUsers; i++) {
            promises.push(
                request(app.getHttpServer())
                    .post("/api/auth/login")
                    .send({
                        email: "particulier@test.com",
                        password: "password123",
                    })
                    .expect(201)
            );
        }

        await Promise.all(promises);
        const duration = Date.now() - startTime;

        expect(duration).toBeLessThan(3000);

        console.log(`50 connexions simultanées en ${duration}ms`);
        console.log(`Débit: ${((concurrentUsers / duration) * 1000).toFixed(1)} req/sec`);
    });
});
