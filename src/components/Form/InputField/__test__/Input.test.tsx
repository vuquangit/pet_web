import React from 'react'
import { render } from '@/tests/unit/utils'
import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { InputField } from '@/components/Form'

describe('Input Field component', () => {
  it('renders the component', async () => {
    const inputValue = ''
    const inputChange = jest.fn()

    const { container, getByDataCy, asFragment } = render(
      <InputField
        value={inputValue}
        label="Input label"
        dataCy="input-cy"
        onChange={inputChange}
        placeholder="Input placeholder"
      />,
    )

    const labelEl = container.querySelector('label')
    // @ts-ignore
    expect(labelEl).toHaveTextContent('Input label')

    const inputEL = container.querySelector('input')
    if (inputEL) {
      // fireEvent.change(inputEL, {target: {value: 'change value'}})

      await userEvent.type(screen.getByPlaceholderText(/Input placeholder/i), 'kunal')
      console.log('getByDataCy:', inputEL)
    }
    // @ts-ignore
    expect(getByDataCy('input-cy')).toHaveValue('')

    expect(asFragment()).toMatchSnapshot()
  })

  // it('with disabled', () => {
  //   const { asFragment } = render(<InputField disabled />)
  //   expect(asFragment()).toMatchSnapshot()
  // })
})
