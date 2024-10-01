/// <reference types="cypress" />
// @ts-check

import React from 'react'

import Button from './index'

describe('Button component', () => {
  it('mounts', () => {
    const onClickSpy = cy.spy().as('onClickSpy')

    cy.mount(
      <Button
        label="Button"
        onClick={onClickSpy}
        dataCy="buttonId"
      />,
    )
    cy.get('[data-cy=buttonId]').should('have.text', 'Button')

    cy.get('[data-cy=buttonId]').click()
    cy.get('@onClickSpy').should('have.been.calledWith', 1)
  })
})
