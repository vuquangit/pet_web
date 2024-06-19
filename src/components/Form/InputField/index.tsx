import React, { useState } from 'react'
import className from 'classnames'

import EyeIcon from '@/assets/icons/eye.svg'

interface PropType {
  /**
   * Label input
   */
  label?: string
  /**
   * Value input
   */
  value: string | number | readonly string[] | undefined
  /**
   * Placeholder
   */
  placeholder?: string
  /**
   * Type input
   */
  type?: React.HTMLInputTypeAttribute | undefined
  /**
   * Input name
   */
  name?: string
  /**
   * Autocomplete
   */
  autoComplete?: string
  /**
   * Input require
   */
  required?: boolean
  /**
   * Cypress cy
   */
  dataCy?: string
  /**
   * Disable input
   */
  disabled?: boolean
  /**
   * Event input change
   * @param value
   * @returns
   */
  onChange?: (value: string) => void
}

const InputField: React.FC<PropType> = (props) => {
  const { name, label, type, dataCy, onChange, ...restProps } = props
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const inputWrapperClass = className('relative', { 'mt-2': label })
  const eyeClass = className('h-4 w-4', {
    'fill-gray-400 ': !isShowPassword,
    'fill-gray-900': isShowPassword,
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    onChange(e.target.value)
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6"
      >
        {label}
      </label>

      <div className={inputWrapperClass}>
        <input
          id={name}
          name={name}
          type={isShowPassword ? 'text' : type || 'text'}
          className="input-default"
          onChange={onInputChange}
          data-cy={dataCy}
          {...restProps}
        />
        {type === 'password' && (
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
