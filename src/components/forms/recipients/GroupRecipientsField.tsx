import React, { Dispatch, FC, SetStateAction } from 'react'

import { InputField } from '@/components/Form'
import { debounce } from 'lodash'
// import {
//   InputContainer,
//   InputField,
//   InputLabel,
// } from '../../utils/styles';

type Props = {
  value: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const GroupRecipientsField: FC<Props> = ({ value, setQuery }) => {
  return (
    <section>
      <InputField
        label="Recipient"
        value={value}
        placeholder="Recipient"
        onChange={debounce(setQuery, 1000)}
      />
    </section>
  )
}
