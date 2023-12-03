import { useLocation } from 'react-router-dom'
import { Header } from './header'
import { ConfigRoutes } from '@config/index'
export function HeaderDefaultCheckout() {
  const location = useLocation()
  const { pathname } = location
  return (
    <Header>
      <strong className="font-bold text-xs sm:text-xl lg:text-2xl text-center">
        {pathname === ConfigRoutes.cupcakes.checkout.next.success.path
          ? 'Pedido finalizado 😊 '
          : 'Pedido cancelado 😢'}
      </strong>
    </Header>
  )
}
