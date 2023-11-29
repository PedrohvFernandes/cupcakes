import { Trash2 } from '@assets/icons'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { QuantityInput } from '@components/inputs/quantity-input'

import { useCart } from '@hooks/push-item-cart'
import { formatMoney } from '@utils/format-money'

import { ICoffeeCartCardProps } from './typings'

export function CoffeeCartCard({ coffee }: Readonly<ICoffeeCartCardProps>) {
  const { changeCartItemQuantity, removeCartItem } = useCart()

  function handleIncrease() {
    changeCartItemQuantity(coffee.id, 'increase')
  }

  function handleDecrease() {
    changeCartItemQuantity(coffee.id, 'decrease')
  }

  function handleRemove() {
    removeCartItem(coffee.id)
  }

  // Total de cada produto
  const coffeesTotal = coffee.price * coffee.quantity

  const formattedPrice = formatMoney(coffeesTotal)

  return (
    <div className="flex flex-col gap-4  md:flex-row items-center justify-between min-h-[8rem]">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <img src={`/coffees/${coffee.photo}`} className="w-16 h-16" />
        <div>
          <p className="text-lg font-bold text-center sm398:text-start">
            {coffee.name}
          </p>

          <div className="mt-2 flex flex-col sm398:flex-row items-center gap-2">
            <QuantityInput
              quantity={coffee.quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />

            <ButtonDefaultOutline
              onClick={handleRemove}
              variantBgOutline={'destructive'}
              className="flex gap-2"
            >
              <Trash2 />
              REMOVER
            </ButtonDefaultOutline>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <span className="leading-3">R$</span>
        <strong className="text-xl">{formattedPrice}</strong>
      </div>
    </div>
  )
}
