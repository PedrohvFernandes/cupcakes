import { ButtonDefaultOutline } from './button-default-outline'

interface IButtonSuccessProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function ButtonSuccess({
  children,
  ...rest
}: Readonly<IButtonSuccessProps>) {
  return (
    <ButtonDefaultOutline
      variantBgOutline={'success'}
      className="flex items-center justify-center gap-2"
      {...rest}
    >
      {children}
    </ButtonDefaultOutline>
  )
}
