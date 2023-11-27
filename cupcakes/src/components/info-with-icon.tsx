import React, { ReactNode } from 'react'

import { cn } from '@lib/utils'

interface IPropsIcon extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  iconSvg: ReactNode
  highlighted: number
  index: number
}

export function Icon({
  className,
  iconSvg,
  highlighted,
  index,
  ...rest
}: Readonly<IPropsIcon>) {
  return (
    <div
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-full p-2 bg-accent/50 group-hover:bg-accent/100 transition-all duration-200',
        highlighted === index ? 'bg-accent/100' : '',
        // rest.className
        className
      )}
      {...rest}
    >
      {iconSvg}
    </div>
  )
}

interface IPropsInfoWithIcon extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<IPropsIcon> | React.ReactElement<IPropsIcon>[]
  text: string | ReactNode
  classNameP?: React.HTMLAttributes<HTMLParagraphElement>['className']
  highlighted: number
  index: number
}

export function InfoWith({
  children,
  text,
  classNameP,
  highlighted,
  index,
  ...rest
}: Readonly<IPropsInfoWithIcon>) {
  return (
    <div className="flex items-center group gap-4" {...rest}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child) || child.type !== Icon) {
          throw new Error(
            'InfoWith must receive only Icon component as children'
          )
        }
        return child
      })}
      {typeof text === 'string' ? (
        <p
          className={cn(
            'text-foreground/80 bg-accent/50 p-2 rounded group-hover:bg-accent/100 transition-all duration-200',
            highlighted === index ? 'bg-accent/100 text-sm' : '',

            classNameP
          )}
        >
          {text}
        </p>
      ) : (
        text
      )}
    </div>
  )
}

const InfoWitchIcon = {
  Icon,
  InfoWith
}

export default InfoWitchIcon
