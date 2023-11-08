import { Button, ButtonProps } from '@components/ui/button'

export function ButtonDefaultOutline({ ...rest }: ButtonProps) {
  return (
    <Button
      {...rest}
      variant={'outline'}
      className="bg-primary-foreground"
    />
  )
}
