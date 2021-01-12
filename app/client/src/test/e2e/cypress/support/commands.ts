/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable  {
    login(): void
  }
}

Cypress.Commands.add('login', () => {
  cy.request('POST', '/login?username=TestUser&password=qwerty')
  cy.getCookie('JSESSIONID').should('exist')
})

export {}