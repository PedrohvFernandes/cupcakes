import { useNavigate } from 'react-router-dom'

import { BottomLine } from '@components/bottom-line'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { Header } from './header'

import { Map, ShoppingCart } from '@assets/icons'

import { ConfigRoutes } from '@config/index'

import { useCart } from '@hooks/push-item-cart'

export function HeaderDefault() {
  const navigate = useNavigate()

  const { cartQuantity } = useCart()

  return (
    <Header>
      <div className="flex items-center gap-2">
        <BottomLine
          variantBottom={'bottom10'}
          path={ConfigRoutes.cupcakes.location.path}
        >
          <ButtonDefaultOutline
            className="w-12 sm:w-14 md:w-44 flex gap-2 items-center"
            path={ConfigRoutes.cupcakes.location.path}
            onClick={() => navigate(ConfigRoutes.cupcakes.location.path)}
          >
            <Map className="text-primary-backgroundIcons" />
            <span className="hidden md:block">Sua localização</span>
          </ButtonDefaultOutline>
        </BottomLine>
        <BottomLine
          variantBottom={'bottom10'}
          path={ConfigRoutes.cupcakes.shoppingCart.path}
        >
          <ButtonDefaultOutline
            path={ConfigRoutes.cupcakes.shoppingCart.path}
            onClick={() => navigate(ConfigRoutes.cupcakes.shoppingCart.path)}
            className="w-12 sm:w-14 md:w-16"
          >
            <div className="relative">
              {cartQuantity >= 1 && (
                <span className="absolute flex items-center justify-center bottom-2 left-5 sm:left-9 w-5 h-5 rounded-lg bg-primary-backgroundIcons text-accent font-bold text-xs sm:text-sm">
                  {cartQuantity}
                </span>
              )}
            </div>
            <ShoppingCart />
          </ButtonDefaultOutline>
        </BottomLine>
      </div>
    </Header>
  )
}
