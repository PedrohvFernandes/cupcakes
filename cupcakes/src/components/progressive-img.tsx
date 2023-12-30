import { useState, useEffect } from 'react'

import { cn } from '@lib/utils'
import { Skeleton } from './ui/skeleton'

interface IProgressiveImgProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
  className?: string
}

export function ProgressiveImg({
  src,
  alt,
  className,
  ...rest
}: Readonly<IProgressiveImgProps>) {
  const [imgSrc, setImgSrc] = useState<string>()

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
    }
  }, [src])

  return (
    <>
      {!imgSrc ? (
        <Skeleton
          className={cn('h-64 rounded-full bg-primary-foreground', className)}
        />
      ) : (
        <img
          src={`${src}`}
          alt={alt ?? ''}
          className={cn(
            'transition-all duration-500',
            `${imgSrc ? 'filter-none' : 'filter blur-sm'}`,
            className
          )}
          loading="lazy"
          // onLoad={e => {
          //   e.currentTarget.style.filter = 'none' // Remove o efeito de desfoque ao carregar
          // }}
          {...rest}
        />
      )}
    </>
  )
}
