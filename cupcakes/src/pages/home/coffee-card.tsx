import { useState } from 'react'

import { useCart } from '@hooks/push-item-cart'
import { formatMoney } from '@utils/format-money'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { QuantityInput } from '@components/inputs/quantity-input'

import { ShoppingCart } from '@assets/icons'

import { ICoffeeProps } from './typings'

export function CoffeeCard({ coffee }: Readonly<ICoffeeProps>) {
  const [quantity, setQuantity] = useState(1)

  function handleIncrease() {
    setQuantity(state => state + 1)
  }

  function handleDecrease() {
    setQuantity(state => state - 1)
  }

  // O addCoffeeToCart é uma função que esta vindo do contexto do carrinho, que foi passada pelo provider do contexto do carrinho
  const { addCoffeeToCart } = useCart()

  function handleAddToCart() {
    const coffeeToAdd = {
      ...coffee,
      quantity
    }
    addCoffeeToCart(coffeeToAdd)
    setQuantity(1)
  }

  function handleDirectPurchase() {
    handleAddToCart()
    // Levar para o stripe direto
    console.log('stripe')
  }

  const formattedPrice = formatMoney(coffee.price)

  return (
    <div className="w-full bg-accent rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg p-5 pt-0 flex flex-col items-center justify-center">
      <img src={`/coffees/${coffee.photo}`} className="w-28 h-28 -mt-5" />
      <div className="w-full flex items-center justify-center gap-1 my-4 flex-wrap">
        {coffee.tags.map(tag => (
          <span
            key={tag}
            className="text-foreground bg-primary/60 p-2 rounded-full font-bold text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="font-bold mb-2">{coffee.name}</h3>
      <p className="text-sm text-center mb-4">{coffee.description}</p>

      <div className="w-full flex flex-col sm430:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="leading-3">R$</span>
          <strong className="text-xl">{formattedPrice}</strong>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col sm355:flex-row items-center justify-center gap-2">
            <QuantityInput
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
            <ButtonDefaultOutline
              onClick={handleAddToCart}
              variantBgOutline={'bgPrimaryForeground'}
            >
              <ShoppingCart />
            </ButtonDefaultOutline>
          </div>
          <ButtonDefaultOutline
            variantBgOutline={'bgPrimaryForeground'}
            className="w-full hover:bg-primary"
            onClick={() => handleDirectPurchase()}
          >
            Comprar
          </ButtonDefaultOutline>
        </div>
      </div>
    </div>
  )
}
