import React, { useState } from 'react'
import className from 'classnames'

import EyeIcon from '@/assets/icons/eye.svg'
import classNames from 'classnames'

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
   * Read only
   */
  readOnly?: boolean
  /**
   * Event input change
   * @param value
   * @returns
   */
  onChange?: (value: string) => void
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  classNameWrapper?: string
  classNameLabel?: string
  classNameInput?: string
}

const InputField: React.FC<PropType> = (props) => {
  const {
    name,
    label,
    type,
    dataCy,
    onChange,
    onFocus,
    classNameWrapper,
    classNameLabel,
    classNameInput,
    ...restProps
  } = props
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const inputWrapperClass = className('relative', { 'mt-2': label })
  const eyeClass = className('h-4 w-4', {
    'fill-gray-400 ': !isShowPassword,
    'fill-gray-900': isShowPassword,
  })
  const inputClass = className(
    'input-default',
    {
      'input-error': restProps?.required,
      'bg-light-100 dark:bg-dark-100 text-light-200 dark:text-dark-200 border-light-100 dark:border-dark-100 cursor-not-allowed !shadow-[none]':
        props.readOnly,
    },
    classNameInput,
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    onChange(e.target.value)
  }

  return (
    <div className={classNameWrapper}>
      <label
        htmlFor={name}
        className={classNames('block text-sm font-medium leading-6', classNameLabel)}
      >
        {label}
      </label>

      <div className={inputWrapperClass}>
        <input
          id={name}
          name={name}
          type={isShowPassword ? 'text' : type || 'text'}
          className={inputClass}
          onChange={onInputChange}
          onFocus={onFocus}
          data-cy={dataCy}
          {...restProps}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-0 h-full px-3 -translate-y-1/2 top-1/2"
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
