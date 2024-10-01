import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import ThemeSwitch from './index'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/ThemeSwitch',
  component: ThemeSwitch,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    function Component(Story, ctx) {
      return (
        <>
          <p className="mb-5">Text to test switch theme</p>
          <Story args={{ ...ctx.args }} />
        </>
      )
    },
  ],
} satisfies Meta<typeof ThemeSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Switch: Story = {
  args: {},
}
