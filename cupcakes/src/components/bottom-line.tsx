// Componente criado por mim
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@lib/utils'
import { useLocation } from 'react-router-dom'

// O css em si do span + a variante de estilo, e por padrao a variante de estilo é a default
const spanVariants = cva(
  "transition-all duration-500 ease-in-out before:content-[''] before:w-0 before:h-[3px] before:bg-primary before:relative before:-left-0 before:block before:transition-width before:duration-500 before:ease-in-out before:hover:w-full",
  {
    variants: {
      variantOpacity: {
        default: 'opacity-70 hover:opacity-100',
        opacity100: 'opacity-100'
      },
      variantBottom: {
        default: 'before:-bottom-6',
        bottom10: 'before:-bottom-10'
      }
    },
    defaultVariants: {
      variantOpacity: 'default',
      variantBottom: 'default'
    }
  }
)

// Criamos uma interface para o componente, que recebe as propriedades do span e as propriedades da variante de estilo e o children
interface ISpanProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof spanVariants> {
  children: React.ReactNode
  path?: string
}

// Criamos o componente em si, que recebe  o children, se quiser pode passar mais classes de estilo quando colocar o componente em outro lugar, as propriedades da variante de estilo, e por fim as propriedades restantes do span...
export function BottomLine({
  children,
  className,
  variantOpacity,
  variantBottom,
  path,
  ...rest
}: Readonly<ISpanProps>) {
  const location = useLocation()

  return (
    // O cn é uma função que junta as classes de estilo e se quiser passar mais classes quando colocar o componente em outro lugar ele pega a prop className e agrupa nas demais classes e obvio substitui por exemplo uma cor de um bg pelo o outro, e o spanVariants é uma função(cva) que retorna as classes de estilo do span juntamente com a variante de estilo passada
    <span
      className={cn(
        spanVariants({ variantOpacity, variantBottom, className }),
        path === location.pathname && 'opacity-100 before:w-full'
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
