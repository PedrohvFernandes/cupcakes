import { useLocation } from 'react-router-dom'

import { cn } from '@lib/utils'

import { Button, ButtonProps } from '@components/ui/button'

interface IButtonDefaultOutlineProps extends ButtonProps {
  path?: string
}

export function ButtonDefaultOutline({
  className,
  path,
  ...rest
}: Readonly<IButtonDefaultOutlineProps>) {
  const location = useLocation()

  return (
    <Button
      {...rest}
      variant={'outline'}
      className={cn(
        'bg-primary-foreground',
        className,
        path === location.pathname && 'bg-accent'
      )}
    />
  )
}
