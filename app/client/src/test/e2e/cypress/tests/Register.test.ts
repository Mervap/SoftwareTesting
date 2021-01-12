describe('Register form', () => {

  beforeEach(() => { cy.visit("/register") })

  it("Password doesn't match", () => {
    testError("Vasya", "abacaba", "abadaba", "Password doesn't match")
  })

  it("User already exists", () => {
    testError("TestUser", "abacaba", "abacaba", "User with such username already exists")
  })

  const testError = (username: string, password: string, passwordConfirm: string, errorMessage: string) => {
    cy.contains('Username').parent().find("input").type(username)
    cy.contains('Password').parent().find("input").type(password)
    cy.contains('Password confirmation').parent().find("input").type(passwordConfirm)
    cy.contains('Register').click()

    // No redirect main page
    cy.url().should('eq', Cypress.config().baseUrl + '/register')
    // Not login
    cy.getCookie('JSESSIONID').should('not.exist')
    // Header not updated
    cy.contains("Welcome").should("contain", 'Guest')
    // Error message
    cy.contains(errorMessage).should("exist")
  }
})

export {}