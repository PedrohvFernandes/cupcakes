import { useNavigate } from 'react-router-dom'

import { Header } from './header'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { BottomLine } from '@components/bottom-line'
import { CupcakesLogo } from '@components/CupcakesLogo'

import { Map, ShoppingCart } from '@assets/icons'

import { ConfigRoutes } from '@config/index'

export function HeaderDefault() {
  const navigate = useNavigate()

  return (
    <Header>
      <CupcakesLogo />
      <div className="flex items-center gap-2">
        <BottomLine
          variantBottom={'bottom10'}
          path={ConfigRoutes.cupcakes.location.path}
        >
          <ButtonDefaultOutline
            className="flex gap-2 items-center"
            path={ConfigRoutes.cupcakes.location.path}
            onClick={() => navigate(ConfigRoutes.cupcakes.location.path)}
          >
            <Map className="text-primary-backgroundIcons" />
            <span>Sua localização</span>
          </ButtonDefaultOutline>
        </BottomLine>
        <BottomLine
          variantBottom={'bottom10'}
          path={ConfigRoutes.cupcakes.shoppingCart.path}
        >
          <ButtonDefaultOutline
            path={ConfigRoutes.cupcakes.shoppingCart.path}
            onClick={() => navigate(ConfigRoutes.cupcakes.shoppingCart.path)}
          >
            <ShoppingCart />
          </ButtonDefaultOutline>
        </BottomLine>
      </div>
    </Header>
  )
}
