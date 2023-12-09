import { useNavigate } from 'react-router-dom'

import { BottomLine } from '@components/bottom-line'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { ModalCart } from '@components/modal-cart'

import { Header } from './header'

import { Map } from '@assets/icons'

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
            <span className="hidden md:block">Sua localização</span>
          </ButtonDefaultOutline>
        </BottomLine>
        <ModalCart />
      </div>
    </Header>
  )
}
