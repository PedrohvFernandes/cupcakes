import { LoaderSpin } from '@components/components-svg/loader-spin'

import { cn } from '@lib/utils'

interface ILoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function LoaderDefault({
  children,
  className,
  ...rest
}: Readonly<ILoaderProps>) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 w-full h-full',
        className
      )}
      {...rest}
    >
      <strong className="text-center text-2xl lg:text-5xl animate-pulse">
        {children}
      </strong>
      <LoaderSpin />
    </div>
  )
}
