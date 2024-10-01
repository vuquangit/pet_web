import { ERoles } from '@/enums/roles'
import { mount } from 'cypress/react'

// import { MountOptions, MountReturn } from 'cypress/react'
// import { EnhancedStore } from '@reduxjs/toolkit'
// import { RootState } from '@/store'

export {}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React Component
       * @param component the React node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactElement,
        // options?: MountOptions & { reduxStore?: EnhancedStore<RootState> }
        options: unknown,
      ): typeof mount

      /** Yields elements with a data-cy attribute that matches a specified selector.
       * ```
       * cy.getByCy('search-toggle') // where the selector is [data-cy="search-toggle"]
       * ```
       */
      getByCy(qaSelector: string, args?: unknown): Chainable<JQuery<HTMLElement>>

      /** Yields elements with data-cy attribute that partially matches a specified selector.
       * ```
       * cy.getByCyLike('chat-button') // where the selector is [data-cy="chat-button-start-a-new-claim"]
       * ```
       */
      getByCyLike(partialQaSelector: string, args?: unknown): Chainable<JQuery<HTMLElement>>

      login(role: ERoles): Chainable<void>
      skipLogin(role: ERoles): Chainable<void>
    }
  }
}
