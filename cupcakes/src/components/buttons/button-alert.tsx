import { ButtonDefaultOutline } from './button-default-outline'
import React from 'react'

interface IButtonAlertProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const ButtonAlert = React.forwardRef<
  HTMLButtonElement,
  IButtonAlertProps
>(({ children, ...rest }, ref) => {
  return (
    <ButtonDefaultOutline
      variantBgOutline={'alert'}
      className="flex items-center justify-center gap-2"
      {...rest}
      ref={ref}
    >
      {children}
    </ButtonDefaultOutline>
  )
})
