import { useLocation } from 'react-router-dom'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@lib/utils'

import { Button, ButtonProps } from '@components/ui/button'

const buttonVariants = cva('', {
  variants: {
    variantBgOutline: {
      default: 'bg-transparent',
      bgPrimaryForeground: 'bg-primary-foreground',
      bgPrimary: 'bg-primary'
    }
  },
  defaultVariants: {
    variantBgOutline: 'default'
  }
})

interface IButtonDefaultOutlineProps
  extends ButtonProps,
    VariantProps<typeof buttonVariants> {
  path?: string
}

export function ButtonDefaultOutline({
  className,
  path,
  variantBgOutline,
  ...rest
}: Readonly<IButtonDefaultOutlineProps>) {
  const location = useLocation()

  return (
    <Button
      {...rest}
      variant={'outline'}
      className={cn(
        buttonVariants({ variantBgOutline, className }),
        path === location.pathname && 'bg-accent'
      )}
    />
  )
}
