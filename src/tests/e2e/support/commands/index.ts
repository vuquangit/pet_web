/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.on('uncaught:exception', (err) => {
  return false
})

import 'cypress-file-upload'
import './localStorage'
import './login'
import './getBy'
