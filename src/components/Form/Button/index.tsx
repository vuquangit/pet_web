import React, { ReactNode } from 'react'
import classNames from 'classnames'

interface ButtonProps {
  /**
   * Type button
   */
  type?: 'button' | 'submit' | 'reset' | 'text' | undefined
  /**
   * Is this the principal call to action on the page?
   */
  color?: 'default' | 'primary' | 'danger'
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label?: string
  /**
   * Optional click handler
   */
  onClick?: (e?: any) => any

  /**
   * Class name
   */
  className?: string

  /**
   * Disable button
   */
  disabled?: boolean
  /**
   * Cypress cy
   */
  dataCy?: string
  children?: ReactNode
  loading?: boolean
}

/**
 * Primary UI component for user interaction
 */
const Button = (props: ButtonProps) => {
  const {
    type = 'button',
    color = 'default',
    size = 'medium',
    backgroundColor,
    label,
    className,
    dataCy,
    children,
    loading,
    ...restProps
  } = props

  const buttonStyles = classNames(
    {
      'btn-default': color === 'default',
      'btn-primary': color === 'primary',
      'btn-danger': color === 'danger',
      'btn-text': type === 'text',
      'px-3 py-[2px] text-[12px]': size === 'small',
      'px-5 py-[4px] text-sm': size === 'medium',
      'px-7 py-[6px] text-[16px]': size === 'large',
    },
    className,
  )

  return (
    <button
      type={type === 'text' ? 'button' : type}
      className={buttonStyles}
      style={{ backgroundColor }}
      data-cy={dataCy}
      {...restProps}
    >
      <span className='flex items-center gap-2'>
        {loading && (
          <span className='flex'>
            <span className="loader text-[80%]"></span>
          </span>
        )}
        {label}
        {children}
      </span>
    </button>
  )
}

export default Button
