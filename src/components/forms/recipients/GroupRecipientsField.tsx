import React, {
  FC,
  // , useCallback
} from 'react'

import { InputField } from '@/components/Form'
// import { debounce } from 'lodash'

type Props = {
  value: string
  // setQuery: Dispatch<SetStateAction<string>>
  setQuery: any
}

export const GroupRecipientsField: FC<Props> = ({ value, setQuery }) => {
  // const handleChange = useCallback(debounce((val) => setQuery(val), 1000), [])

  return (
    <section>
      <InputField
        label="Recipient"
        value={value}
        placeholder="Recipient"
        onChange={setQuery}
      />
    </section>
  )
}
