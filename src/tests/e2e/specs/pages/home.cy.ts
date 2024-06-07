import { ERoles } from '@/enums/roles'

describe('HomePage', function () {
  beforeEach(function () {
    cy.skipLogin(ERoles.SUPER_ADMIN)
    cy.visit('/')
  })

  it('render', function () {
    cy.getByCy('home-page').should('be.visible').and('have.length.greaterThan', 0)
  })
})
