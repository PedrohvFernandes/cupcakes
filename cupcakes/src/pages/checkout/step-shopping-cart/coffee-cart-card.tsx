import { QuantityInput } from '@components/inputs/quantity-input'

import { useCart } from '@hooks/push-item-cart'
import { formatMoney } from '@utils/format-money'

import { ICoffeeCartCardProps } from './typings'
import { Separator } from '@components/ui/separator'
import { ButtonTrash } from '@components/buttons/button-trash'

export function CoffeeCartCard({ coffee }: Readonly<ICoffeeCartCardProps>) {
  const { changeCartItemQuantity } = useCart()

  function handleIncrease() {
    changeCartItemQuantity(coffee.id, 'increase')
  }

  function handleDecrease() {
    changeCartItemQuantity(coffee.id, 'decrease')
  }


  // Total de cada produto
  const coffeesTotal = coffee.price * coffee.quantity

  const formattedPrice = formatMoney(coffeesTotal)

  return (
    <>
      <div className="flex flex-col gap-4  md:flex-row items-center justify-between min-h-[8rem]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <img src={`${coffee.photo}`} className=" h-28" />
          <div>
            <p className="text-lg font-bold text-center sm398:text-start">
              {coffee.name}
            </p>

            <div className="mt-2 flex flex-col sm430:flex-row items-center gap-2">
              <QuantityInput
                quantity={coffee.quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />

              <ButtonTrash coffeeId={coffee.id}>REMOVER</ButtonTrash>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="leading-3">R$</span>
          <strong className="text-xl">{formattedPrice}</strong>
        </div>
      </div>
      <Separator className="bg-primary" />
    </>
  )
}
