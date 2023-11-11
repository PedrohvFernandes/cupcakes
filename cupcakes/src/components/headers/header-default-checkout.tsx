import { Header } from './header'
import { CupcakesLogo } from '@components/components-svg/cupcakes-logo'

export function HeaderDefaultCheckout() {
  return (
    <Header>
      <CupcakesLogo />
      <strong className="font-bold">Finalizar a compra (1 item)</strong>
    </Header>
  )
}
