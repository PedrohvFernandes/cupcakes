import { useNavigate } from 'react-router-dom'

import { useCart } from '@hooks/push-item-cart'
import { formatMoney } from '@utils/format-money'

import { Check, CornerUpLeft } from '@assets/icons'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'

import { ConfigRoutes } from '@config/index'
import { PayButtonStripe } from '@components/buttons/pay-button-stripe'

// const DELIVERY_PRICE = 3.5

export function ConfirmationSection() {
  // const { cartItems } = useCart()

  const { cartItemsTotal, cartQuantity } = useCart()

  const navigate = useNavigate()

  // const cartTotal = DELIVERY_PRICE + cartItemsTotal

  const formattedItemsTotal = formatMoney(cartItemsTotal)
  // const formattedCartTotal = formatMoney(cartTotal)
  // const formattedDeliveryPrice = formatMoney(DELIVERY_PRICE)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <span className="font-semibold text-xs sm:text-base">Entrega:</span>{' '}
        <span className="font-semibold text-xs sm:text-base text-center">
          Frete a ser calculado ao confirmar o pedido
        </span>
        {/* <span>{formattedDeliveryPrice}</span> */}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between">
        <span className="sm:text-2xl font-bold">Total da compra:</span>
        <div className="flex items-center gap-1">
          <span className="leading-3">R$</span>
          <strong className="sm:text-3xl">{formattedItemsTotal}</strong>
        </div>
      </div>

      {/* 
      <div>
        <span className="text-sm">Total:</span>
        <div className="flex items-center gap-1">
          <span className="leading-3">R$</span>
          <strong className="text-xl">{formattedCartTotal}</strong>
        </div>
      </div> */}

      {/* <ButtonDefaultOutline
        variantBgOutline={'success'}
        disabled={cartQuantity <= 0}
        onClick={() => handleConfirmOrder()}
        className="flex items-center justify-center gap-2"
      >
        {cartQuantity <= 0 ? (
          'Selecione algum produto'
        ) : (
          <>
            Confirmar pedido
            <Check />
          </>
        )}
      </ButtonDefaultOutline> */}
      <PayButtonStripe
        variantBgOutline={'success'}
        disabled={cartQuantity <= 0}
        handlePaymentItemsOrOneItem='handlePaymentItems'
        className="flex items-center justify-center gap-2"
      >
        {cartQuantity <= 0 ? (
          'Selecione algum produto'
        ) : (
          <>
            Confirmar pedido
            <Check />
          </>
        )}
      </PayButtonStripe>

      <p className="text-center font-semibold text-sm sm:text-base">Ou</p>

      <ButtonDefaultOutline
        variantBgOutline={'alert'}
        onClick={() => navigate(ConfigRoutes.cupcakes.default.source.path)}
        className="flex items-center justify-center gap-2"
      >
        {cartQuantity <= 0 ? 'Volte para a loja' : 'Continuar comprando'}
        <CornerUpLeft />
      </ButtonDefaultOutline>
    </section>
  )
}
