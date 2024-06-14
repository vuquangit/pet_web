import React, { useState } from 'react'
import className from 'classnames'

import EyeIcon from '@/assets/icons/eye.svg'

interface PropType {
  label?: string
  value: string
  placeholder?: string
  type?: string
  name?: string
  autoComplete?: string
  required?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  dataCy?: string
}

const InputField: React.FC<PropType> = (props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const inputWrapperClass = className('relative', { 'mt-2': props.label })
  const eyeClass = className('h-4 w-4', {
    'fill-gray-400 ': !isShowPassword,
    'fill-gray-900': isShowPassword,
  })

  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6"
      >
        {props.label}
      </label>

      <div className={inputWrapperClass}>
        <input
          id={props.name}
          name={props.name}
          type={isShowPassword ? 'text' : props.type || 'text'}
          autoComplete={props.autoComplete}
          required={props.required}
          className="input-default"
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          data-cy={props.dataCy}
        />
        {props.type === 'password' && (
          <button
            type="button"
            className="absolute right-0 top-1/2 h-full -translate-y-1/2 px-3"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            <EyeIcon className={eyeClass} />
          </button>
        )}
      </div>
    </div>
  )
}

export default InputField
