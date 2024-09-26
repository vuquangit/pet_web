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
  primary?: boolean
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
}

/**
 * Primary UI component for user interaction
 */
const Button = (props: ButtonProps) => {
  const {
    type = 'button',
    primary = false,
    size = 'medium',
    backgroundColor,
    label,
    className,
    dataCy,
    children,
    ...restProps
  } = props

  const buttonStyles = classNames(
    {
      'btn-default': !primary,
      'btn-primary': primary,
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
      {label}
      {children}
    </button>
  )
}

export default Button
