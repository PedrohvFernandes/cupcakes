import { useLocation } from 'react-router-dom'
import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@lib/utils'

import { Button, ButtonProps } from '@components/ui/button'
// import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva('', {
  variants: {
    variantBgOutline: {
      default: 'bg-transparent',
      bgPrimaryForeground: 'bg-primary-foreground',
      bgPrimary: 'bg-primary',
      success: 'bg-primary-foreground hover:bg-success text-success-foreground',
      alert: 'bg-primary-foreground hover:bg-alert hover:text-alert-foreground',
      destructive: 'bg-primary-foreground hover:bg-destructive'
    }
  },
  defaultVariants: {
    variantBgOutline: 'default'
  }
})

export interface IButtonDefaultOutlineProps
  extends ButtonProps,
    VariantProps<typeof buttonVariants> {
  path?: string
  // asChild?: boolean
}

export const ButtonDefaultOutline = React.forwardRef<
  HTMLButtonElement,
  IButtonDefaultOutlineProps
>(
  (
    {
      className,
      path,
      // asChild,
      variantBgOutline,
      ...rest
    },
    ref
  ) => {
    const location = useLocation()

    // Se asChild for true, o componente Slot será renderizado, o slot é o filho do componente ButtonDefaultOutline
    // const Comp = asChild ? Slot : Button

    return (
      <Button
        {...rest}
        variant={'outline'}
        className={cn(
          buttonVariants({ variantBgOutline, className }),
          path === location.pathname && 'bg-accent'
        )}
        ref={ref}
      />
    )
  }
)
