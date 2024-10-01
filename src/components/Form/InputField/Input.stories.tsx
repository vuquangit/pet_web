import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import InputField from './index'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Form/Input',
  component: InputField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    value: '',
  },
  decorators: [
    function Component(Story, ctx) {
      const [, setArgs] = useArgs<typeof ctx.args>()

      const onChange = (value: string) => {
        ctx.args.onChange?.(value)

        // Check if the component is controlled
        if (ctx.args.value !== undefined) {
          setArgs({ value })
        }
      }

      return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <Story args={{ ...ctx.args, onChange }} />
      )
    },
  ],
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const InputEmpty: Story = {
  args: {},
}

export const InputWithLabel: Story = {
  args: {
    label: 'Label input',
    type: 'text',
  },
}

export const InputWithPlaceholder: Story = {
  args: {
    label: 'Label input',
    type: 'text',
    placeholder: 'Please input',
  },
}

export const InputDisabled: Story = {
  args: {
    label: 'Label input',
    type: 'text',
    placeholder: 'Please input',
    disabled: true,
  },
}
