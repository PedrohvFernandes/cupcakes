import { Header } from './header'

import { Map, ShoppingCart } from '@assets/icons'
import { CupcakesLogo } from '@assets/index'
import { BottomLine } from '@components/bottom-line'

export function HeaderDefault() {
  return (
    <Header>
      <CupcakesLogo />
      <div className="flex items-center gap-2">
        <BottomLine variant={'opacity100'}>
          <div className="flex gap-2 items-center">
            <Map className="text-primary-backgroundIcons" />
            <span>Sua localização</span>
          </div>
        </BottomLine>
        <ShoppingCart />
      </div>
    </Header>
  )
}
