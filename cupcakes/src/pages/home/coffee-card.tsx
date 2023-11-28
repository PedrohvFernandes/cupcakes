import { useState } from 'react'

import { useCart } from '@hooks/push-item-cart'
import { formatMoney } from '@utils/format-money'

import { QuantityInput } from '@components/inputs/quantity-input'

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
  }

  const formattedPrice = formatMoney(coffee.price)
  
  return (
    <div>
      <p>cafe</p>
    </div>
  )
}
