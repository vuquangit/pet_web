import React from 'react'
import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { Provider } from 'react-redux'

import '@/styles/index.scss'
import '@/styles/tailwind.scss'
import { setupStore } from '@/store'
import { ETheme } from '@/enums/theme'

/* snipped for brevity */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: ETheme.LIGHT,
        dark: ETheme.DARK,
      },
      defaultTheme: ETheme.LIGHT,
    }),
    (Story) => {
      const store = setupStore()

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    },
  ],
}

export default preview
