describe("Liste des interevanats", () => {
  it("affiche les intervenants", () => {
    const fakeIntervenants = [
      {
        id: "1",
        firstname: "pierre",
        lastname: "Paul",
        email: "Pierre@example.com",
        phoneNumber: "0612345678",
        status: "Disponible",
        tasks: [],
      },
      {
        id: "2",
        firstname: "Bob",
        lastname: "Marlet",
        email: "bob@example.com",
        phoneNumber: "0676543210",
        status: "Occupé",
        tasks: [],
      },
    ];

    cy.intercept("GET", "http://localhost:3000/intervenants", {
      statusCode: 200,
      body: fakeIntervenants,
    }).as("getAllintervenants");

    cy.visit("http://localhost:5173/mesIntervenants");

    cy.wait("@getAllintervenants");

    cy.contains("pierre").should("exist");
    cy.contains("Paul").should("exist");
    cy.contains("Pierre@example.com").should("exist");
    cy.contains("0612345678").should("exist");
    cy.contains("Disponible").should("exist");

    cy.contains("Bob").should("exist");
    cy.contains("Marlet").should("exist");
    cy.contains("bob@example.com").should("exist");
    cy.contains("0676543210").should("exist");
    cy.contains("Occupé").should("exist");
  });
});
