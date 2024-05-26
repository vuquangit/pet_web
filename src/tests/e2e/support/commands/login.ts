/// <reference types="cypress" />
// @ts-check

import { ERoles } from '@/enums/roles'
import { IAuthResponse } from '@/interfaces/auth'
import StorageService from '@/services/local-storage'
import { storageKeys } from '@/constants/storage-keys'

const email = Cypress.env('AUTH_USERNAME')
const password = Cypress.env('AUTH_PASSWORD')
const accessToken = Cypress.env('AUTH_ACCESS_TOKEN')
const refreshToken = Cypress.env('AUTH_REFRESH_TOKEN')

// export const secretKey = Cypress.env('AUTH_TOKEN_SECRET_KEY')
export const authToken: Omit<IAuthResponse, 'tokenType'> = {
  accessToken,
  refreshToken,
}

function loginViaAuth0Ui(username: string, password: string, role: ERoles) {
  cy.intercept('POST', '**/auth/login', { fixture: 'auth/login.json' }).as('loginApi')

  // redirects to auth.
  cy.visit('/')

  cy.get('input[id=email]').type(username)
  // cy.get('input[id=password]').type(`${password}{enter}`, { log: false })
  cy.get('input[id=password]').type(password)
  cy.get('[data-cy=login-submit]').click()
  cy.wait(['@loginApi'])

  // Ensure Auth has redirected us back to the dashboard.
  cy.url().should('equal', 'http://localhost:3000/')
}

Cypress.Commands.add('login', (role: ERoles) => {
  let fixture: string
  switch (role) {
    case ERoles.SUPER_ADMIN:
      fixture = 'auth/profile/super-admin.json'
      break

    default:
      fixture = 'auth/profile/admin.json'
      break
  }
  cy.intercept('GET', '**/auth/profile', { fixture }).as('authMeApi')

  const log = Cypress.log({
    displayName: 'AUTH LOGIN',
    message: [`🔐 Authenticating | ${email}`],
    autoEnd: false,
  })
  log.snapshot('before')

  cy.session(
    `auth-${role}-${email}`,
    () => {
      loginViaAuth0Ui(email, password, role)
    },
    {
      validate: () => {
        // Validate presence of access token in localStorage.
        const authProfileLocal = StorageService.get(storageKeys.AUTH_PROFILE)
        console.log('authProfileLocal', authProfileLocal)
        const accessToken = authProfileLocal?.accessToken || ''
        cy.wrap(accessToken).should('not.be.empty')
      },
      // cacheAcrossSpecs: true,
    },
  )

  log.snapshot('after')
  log.end()
})

Cypress.Commands.add('skipLogin', (role: ERoles) => {
  let fixture: string
  switch (role) {
    case ERoles.SUPER_ADMIN:
      fixture = 'auth/profile/super-admin.json'
      break

    default:
      fixture = 'auth/profile/admin.json'
      break
  }
  cy.intercept('GET', '**/auth/profile', { fixture }).as('authMeApi')

  const log = Cypress.log({
    displayName: 'AUTH LOGIN',
    message: [`🔐 Authenticating | ${email}`],
    autoEnd: false,
  })
  log.snapshot('before')

  cy.session(
    `auth-${role}-${email}-skip`,
    () => {
      StorageService.set(storageKeys.AUTH_PROFILE, authToken)
      cy.visit('/')
      cy.wait(['@authMeApi'])
    },
    {
      validate: () => {
        // Validate presence of access token in localStorage.
        const authProfileLocal = StorageService.get(storageKeys.AUTH_PROFILE)
        const accessToken = authProfileLocal?.accessToken || ''
        cy.wrap(accessToken).should('not.be.empty')
      },
      // cacheAcrossSpecs: true,
    },
  )

  log.snapshot('after')
  log.end()
})
