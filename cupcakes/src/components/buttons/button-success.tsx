import React from 'react'

import { ButtonDefaultOutline } from './button-default-outline'

interface IButtonSuccessProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const ButtonSuccess = React.forwardRef<
  HTMLButtonElement,
  IButtonSuccessProps
>(({ children, ...rest }, ref) => {
  return (
    <ButtonDefaultOutline
      variantBgOutline={'success'}
      className="flex items-center justify-center gap-2"
      {...rest}
      ref={ref}
    >
      {children}
    </ButtonDefaultOutline>
  )
})
