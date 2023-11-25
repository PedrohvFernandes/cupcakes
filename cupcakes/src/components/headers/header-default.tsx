import { useNavigate } from 'react-router-dom'

import { Header } from './header'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { BottomLine } from '@components/bottom-line'

import { Map, ShoppingCart } from '@assets/icons'

import { ConfigRoutes } from '@config/index'

export function HeaderDefault() {
  const navigate = useNavigate()

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
            <span className='hidden md:block'>Sua localização</span>
          </ButtonDefaultOutline>
        </BottomLine>
        <BottomLine
          variantBottom={'bottom10'}
          path={ConfigRoutes.cupcakes.shoppingCart.path}
        >
          {/* Aqui no cart vai aparecer a quantidade de produtos listados, se ele selecionou 2, mas  dentre os dois um ele colocou que quer 5, continua aparecendo 2 itens no icone do carrinho */}
          <ButtonDefaultOutline
            path={ConfigRoutes.cupcakes.shoppingCart.path}
            onClick={() => navigate(ConfigRoutes.cupcakes.shoppingCart.path)}
            className='w-12 sm:w-14 md:w-16'
          >
            <ShoppingCart />
          </ButtonDefaultOutline>
        </BottomLine>
      </div>
    </Header>
  )
}
