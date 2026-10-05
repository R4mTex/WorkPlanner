/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
	namespace Cypress {
		interface Chainable {
			loginByApi(): Chainable<void>;
		}
	}
}

export {};

Cypress.Commands.add("loginByApi", () => {
	cy.request({
		method: "POST",
		url: "http://localhost:3000/login",
		body: {
			email: "Cristopher_Gleichner74@yahoo.com",
			password: "test",
		},
	}).then((response) => {
		expect(response.status).to.eq(201);
		expect(response.body).to.have.property("user");

		const rawSetCookie = response.headers["set-cookie"];
		const cookies = Array.isArray(rawSetCookie) ? rawSetCookie : [rawSetCookie];

		cookies.forEach((cookieStr) => {
			const [cookie] = cookieStr.split(";");
			const [name, value] = cookie.split("=");

			if (name && value) {
				cy.setCookie(name.trim(), value.trim());
			}
		});
	});
});
