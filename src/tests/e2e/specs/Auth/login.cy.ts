/* eslint-disable jest/no-commented-out-tests */
/// <reference types="cypress" />
// @ts-check

import { ERoles } from '@/enums/roles'

describe('Login Page', () => {
  it('role: super admin', () => {
    cy.login(ERoles.SUPER_ADMIN)
  })

  it('role: admin', () => {
    cy.login(ERoles.SUPER_ADMIN)
  })

  it('role: operator', () => {
    cy.login(ERoles.OPERATOR)
  })

  it('input empty', () => {
    cy.visit('/auth/login')
    cy.get('[data-cy=email]').clear()
    cy.get('[data-cy=password]').clear()

    // cy.getByCy('login-submit').click()
    cy.get('[data-cy=login-submit]').should('be.disabled')
  })

  // it('password format incorrect', () => {
  //   cy.visit('/login')
  //   const email = Cypress.env('AUTH_USERNAME')
  //   const password = 'password'
  //   cy.get('input[id=login_email]').type(email)
  //   cy.get('input[id=login_password]').type(`${password}{enter}`, { log: false })
  //   cy.get('.error-message').contains(
  //     'password is incorrect'
  //   )
  // })

  // it('error failed', () => {
  //   cy.intercept('POST', '**/auth/login', {
  //     statusCode: 401,
  //     body: {
  //       status: 401,
  //       success: false,
  //       error: {
  //         code: 'login_failed',
  //         message: 'Failed to login.',
  //       },
  //     },
  //   }).as('loginApi')
  //   cy.visit('/login')

  //   const email = Cypress.env('AUTH_USERNAME')
  //   const password = Cypress.env('AUTH_PASSWORD')
  //   cy.get('input[id=login_email]').type(email)
  //   cy.get('input[id=login_password]').type(`${password}{enter}`, { log: false })
  //   cy.wait(['@loginApi'])
  //   cy.get('.error-message').contains(
  //     'login failed...'
  //   )
  // })

  it('redirect reset password', () => {
    cy.visit('/auth/login')
    cy.getByCy('btn-forgot-password').click()
    cy.url().should('equal', 'http://localhost:3000/auth/forgot-password')
  })
})
