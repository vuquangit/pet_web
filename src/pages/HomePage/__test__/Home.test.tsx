import React from 'react'
import { HomePage } from '../index'
import { render } from '@/tests/unit/utils'
import { describe, expect, it } from '@jest/globals'

describe('HomePage tests', () => {
  it('renders the component', () => {
    const { asFragment, container } = render(<HomePage />)

    const loadingClass = container.getElementsByClassName('App')
    expect(loadingClass.length).toBe(1)

    expect(asFragment()).toMatchSnapshot()
  })
})
