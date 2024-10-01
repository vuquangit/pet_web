/* eslint-disable jest/no-commented-out-tests */
import React from 'react'

import { screen } from '@testing-library/react'
import { render } from '@/tests/unit/utils'

import userEvent from '@testing-library/user-event'
import FormBehavior from './FormBehaviour'
import '@testing-library/jest-dom'

test('Form getting submitted with correct input values', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { container, getByDataCy, asFragment } = render(<FormBehavior />)

  userEvent.type(screen.getByPlaceholderText(/enter name/i), 'kunal')
  userEvent.type(screen.getByPlaceholderText(/enter password/i), 'pass')
  userEvent.selectOptions(screen.getByLabelText(/select country/i), 'India')
  userEvent.click(screen.getByText(/submit/i))

  // @ts-ignore
  expect(screen.getByText(/form submitted/i)).toBeInTheDocument()
})

// test('Empty fields error shown', () => {
//   render(<FormBehavior/>)
//   userEvent.click(screen.getByText(/submit/i))
//   // @ts-ignore
//   expect(screen.getByText(/please fill all the details/i)).toBeInTheDocument();
// })

// test('Invalid name error shown', () => {
//   render(<FormBehavior/>)
//   userEvent.type(screen.getByPlaceholderText(/enter name/i), '@###')
//   userEvent.type(screen.getByPlaceholderText(/enter password/i), 'pass')
//   userEvent.selectOptions(screen.getByLabelText(/select country/i), 'India')
//   userEvent.click(screen.getByText(/submit/i))
//   // @ts-ignore
//   expect(screen.getByText(/Please enter a valid name/i)).toBeInTheDocument();
// })
