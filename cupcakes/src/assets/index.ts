// Antes era feito dessa maneira usando vite
// export { ReactComponent as ImageLogotipo } from './logo-cupcakes.svg'

// Depois era feito dessa maneira, meio que o ReactComponent era o tipo/componente comum de svg feito no custom.d.ts, e em seguida passávamos um alias para o svg para podermos o usar como um componente, mas ao fazer isso ele fazia isso na importação do svg na web: Uncaught SyntaxError: The requested module '/src/assets/logo-cupcakes.svg?import&react' does not provide an export named 'ReactComponent', colocando o import no meio do caminho
// export { ReactComponent as CupcakesLogo } from '@assets/logo-cupcakes.svg?react'

// Agora é feito dessa maneira, ja passando o alias para o svg, e o vite faz o resto, e não da mais erro na importação na web, o transformando em um componente. Ele sabe que tem que transforma o svg em um componente, pois o vite já vem com o plugin vite-plugin-react-svg, que faz isso e por conta do custom.d.ts, criamos o module *.svg?react e passando ?react depois do caminho do svg ele sabe que tem que transformar o svg em um componente/ReactComponent
import CupcakesLogoSVG from '@assets/logo-cupcakes.svg?react'

export {
  CupcakesLogoSVG
}