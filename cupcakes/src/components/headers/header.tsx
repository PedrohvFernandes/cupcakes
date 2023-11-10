interface IHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Header({ children, ...rest }: IHeaderProps) {
  return (
    <header
      className="fixed z-auto w-full bg-primary-foreground px-2 py-2 top-0 left-0 flex items-center justify-between shadow-lg drop-shadow-lg"
      {...rest}
    >
      <div className="container flex items-center justify-between w-full">
        {children}
      </div>
    </header>
  )
}
