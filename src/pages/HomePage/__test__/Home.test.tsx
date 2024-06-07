import React from 'react'
import { HomePage } from '../index'
import { renderWithProviders } from '@/tests/unit/utils'

describe('HomePage tests', () => {
  it('renders the component', () => {
    const { asFragment, container } = renderWithProviders(<HomePage />)

    const loadingClass = container.getElementsByClassName('App')
    expect(loadingClass.length).toBe(1)

    expect(asFragment()).toMatchSnapshot()
  })
})
