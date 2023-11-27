import React, { ReactNode } from 'react'

import { cn } from '@lib/utils'

interface IPropsIcon extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  iconSvg: ReactNode
}

export function Icon({ className, iconSvg, ...rest }: Readonly<IPropsIcon>) {
  return (
    <div
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-full p-2',
        // rest.className
        className
      )}
      {...rest}
    >
      {iconSvg}
    </div>
  )
}

interface IPropsInfoWithIcon {
  children: React.ReactElement<IPropsIcon> | React.ReactElement<IPropsIcon>[]
  text: string | ReactNode
}

export function InfoWith({ children, text }: Readonly<IPropsInfoWithIcon>) {
  return (
    <div className="flex items-center gap-4">
      {React.Children.map(children, child => {
        if (!React.isValidElement(child) || child.type !== Icon) {
          throw new Error(
            'InfoWith must receive only Icon component as children'
          )
        }
        return child
      })}
      {typeof text === 'string' ? <p>{text}</p> : text}
    </div>
  )
}

const InfoWitchIcon = {
  Icon,
  InfoWith
}

export default InfoWitchIcon
