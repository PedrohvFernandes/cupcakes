import { cn } from '@lib/utils'

interface IHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Header({
  children,
  className,
  ...rest
}: Readonly<IHeaderProps>) {
  return (
    <header
      className={cn(
        'fixed z-50 w-full bg-primary-foreground px-2 py-2 top-0 left-0 flex items-center justify-between shadow-lg drop-shadow-lg',
        className
      )}
      {...rest}
    >
      <div className="container flex items-center justify-between w-full">
        {children}
      </div>
    </header>
  )
}
