import React from 'react'
import { Button } from '@/components/Form'
import { render } from '@/tests/unit/utils'
import { describe, expect, it } from '@jest/globals'
import { cleanup, fireEvent } from '@testing-library/react'

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Button tests', () => {
  it('renders the component', () => {
    const testClick = jest.fn()

    const { getByDataCy, asFragment } = render(
      <Button
        label="Button label"
        dataCy="button-cy"
        onClick={testClick}
      />,
    )

    // FIXME: fix jest-dom typescript not working ?
    // @ts-ignore
    expect(getByDataCy('button-cy')).toHaveTextContent('Button label')

    fireEvent.click(getByDataCy('button-cy'))
    expect(testClick).toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  it('with disabled', () => {
    const { asFragment } = render(<Button disabled />)
    expect(asFragment()).toMatchSnapshot()
  })
})
