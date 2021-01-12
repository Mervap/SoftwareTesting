describe('Login form', () => {

  beforeEach(() => { cy.visit("/login") })

  it('Correct login', () => {
    cy.contains('Username').parent().find("input").type("TestUser")
    cy.contains('Password').parent().find("input").type("qwerty")
    cy.contains('Login').click()

    // Redirect to main page
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    // Login
    cy.getCookie('JSESSIONID').should('exist')
    // Header updated
    cy.contains("Welcome").should("contain", 'TestUser')
  })

  it('Bad credentials', () => {
    cy.contains('Username').parent().find("input").type("TestUser")
    cy.contains('Password').parent().find("input").type("bugaga")
    cy.contains('Login').click()

    // No redirect main page
    cy.url().should('eq', Cypress.config().baseUrl + '/login')
    // Not login
    cy.getCookie('JSESSIONID').should('not.exist')
    // Header not updated
    cy.contains("Welcome").should("contain", 'Guest')
    // Error message
    cy.contains("Bad credentials").should("exist")
  })
})

export {}