describe('Attempt to resolve the sum', () => {
  it('loads the form', () => {
    cy.visit('/form')

    cy.get('main.form').should('exist')

    cy.wait(1000)
  })

  it('answers "0" and gets an error', () => {
    cy.get('main form input').type('0')

    cy.wait(1000)

    cy.get('main form button').click()

    cy.wait(1000)

    cy.get('.error').should('exist')

    cy.get('.error').contains('Invalid result')

    cy.wait(1000)
  })

  it('answers "2" and gets the congrats page', () => {
    cy.get('main form input').type('2')

    cy.get('main form button').click()

    cy.wait(1000)

    cy.get('.error').should('not.exist')

    cy.get('main.congrats').should('exist')

    cy.wait(1000)
  })
})
