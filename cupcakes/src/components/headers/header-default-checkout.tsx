import { Header } from './header'

import { CupcakesLogo } from '@assets/index'

export function HeaderDefaultCheckout() {
  return (
    <Header>
      <CupcakesLogo />
      <span className="font-bold">Finalizar a compra (1 item)</span>
    </Header>
  )
}
