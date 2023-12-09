import { ButtonDefaultOutline } from './button-default-outline'

interface IButtonAlertProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function ButtonAlert({
  children,
  ...rest
}: Readonly<IButtonAlertProps>) {
  return (
    <ButtonDefaultOutline
      variantBgOutline={'alert'}
      className="flex items-center justify-center gap-2"
      {...rest}
    >
      {children}
    </ButtonDefaultOutline>
  )
}
