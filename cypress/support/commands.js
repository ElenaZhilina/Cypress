
Cypress.Commands.add('login', (email, password) => { 
    cy.contains("Log in").click();
    if (email) 
        cy.get("#mail").type(email);
    if (password)
        cy.get("#pass").type(password);
    cy.contains("Submit").click();
})

