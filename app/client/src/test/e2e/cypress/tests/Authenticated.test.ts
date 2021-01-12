describe('With login tests', () => {

  beforeEach(() => { cy.login() })

  it('Name in header', () => {
    cy.visit("/")
    cy.get('div.authenticationMenu > button > span.MuiButton-label').should('contain', 'TestUser')
  })

  it('Saved field button exists', () => {
    cy.visit("/")
    cy.get('div.pro-sidebar-content > nav > ul > li:nth-child(3)').should('contain', 'Saved fields')
  })

  it('Login page', () => {
    cy.visit("/login")
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})

describe('Without login tests', () => {
  it('Name in header', () => {
    cy.visit("/")
    cy.get('div.authenticationMenu > button > span.MuiButton-label').should('contain', 'Guest')
  })

  it('Saved field button exists', () => {
    cy.visit("/")
    cy.get('div.pro-sidebar-content > nav > ul > li:nth-child(3)').should('not.exist')
  })

  it('Login page', () => {
    cy.visit("/login")
    cy.url().should('eq', Cypress.config().baseUrl + '/login')
  })
})


export {}