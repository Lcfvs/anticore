describe('Listen the events', () => {
  it('loads the home and checks the initial ping', () => {
    cy.visit('/')

    cy.get('body > header > [data-sse]').should('exist')

    cy.get('body > header > [data-sse] > .sse[data-target]').should('exist')

    cy.get('body > header > [data-sse] > .sse[data-target]').invoke('text').then(Number).should('be.eq', 0)

    cy.wait(1000)
  })

  it('Checks if the ping grows', () => {
    cy.get('body > header > [data-sse] > .sse[data-target]').invoke('text').then(Number).should('be.above', 0)

    cy.wait(5000)
  })

  it('Checks if the ping still grows during the navigation', () => {
    cy.get('main a[href="/form"]').click()

    cy.get('main.form').should('exist')

    cy.get('body > header > [data-sse] > .sse[data-target]').invoke('text').then(Number).should('be.above', 5)

    cy.wait(1000)
  })
})
