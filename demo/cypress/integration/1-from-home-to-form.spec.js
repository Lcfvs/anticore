describe('From / to /form', () => {
  it('loads the home', () => {
    cy.visit('/')

    cy.get('main.home').should('exist')

    cy.wait(1000)
  })

  it('loads the form by clicking the anchor', () => {
    cy.get('a').contains('Load the form page')

    cy.get('main a[href="/form"]').click()

    cy.get('main.form').should('exist')

    cy.wait(1000)
  })
})
