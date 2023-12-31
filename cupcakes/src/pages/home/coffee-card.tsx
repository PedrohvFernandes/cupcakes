import { useState } from 'react'

import { useCart } from '@hooks/push-item-cart'
import { formatMoney } from '@utils/format-money'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { QuantityInput } from '@components/inputs/quantity-input'

import { ShoppingCart } from '@assets/icons'

import { useToast } from '@components/ui/use-toast'
import { ICoffeeProps } from './typings'
import { PayButtonStripe } from '@components/buttons/pay-button-stripe'
import { ProgressiveImg } from '@components/progressive-img'

export function CoffeeCard({ coffee }: Readonly<ICoffeeProps>) {
  const [quantity, setQuantity] = useState(1)

  const { toast } = useToast()

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
    toast({
      title: `${coffee.name} foi adicionado ao carrinho, com ${quantity} ${
        quantity === 1 ? 'unidade' : 'unidades'
      }.`,
      variant: 'success',
      duration: 5000
    })
    addCoffeeToCart(coffeeToAdd)
    setQuantity(1)
  }

  const formattedPrice = formatMoney(coffee.price)

  return (
    <div className="w-full bg-accent rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg p-5 pt-0 flex flex-col items-center justify-center">
      {/* <img
        src={`${coffee.photo}`}
        className="w-44 -mt-5 rounded"
        loading="lazy"
        style={{ filter: 'blur(10px)', transition: 'filter 0.5s' }}
        onLoad={e => {
          e.currentTarget.style.filter = 'none' // Remove o efeito de desfoque ao carregar
        }}
      /> */}
      <ProgressiveImg src={`${coffee.photo}`} className="w-44 -mt-5 rounded" />

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
      <h3 className="font-bold text-center mb-2">{coffee.name}</h3>
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
          {/* <ButtonDefaultOutline
            variantBgOutline={'bgPrimaryForeground'}
            className="w-full hover:bg-primary"
            onClick={() => handleDirectPurchase()}
          >
            Comprar
          </ButtonDefaultOutline> */}
          <PayButtonStripe
            className="w-full"
            coffeeUnique={{
              ...coffee,
              quantity
            }}
            handlePaymentItemsOrOneItem="withOneItem"
          >
            Comprar
          </PayButtonStripe>
        </div>
      </div>
    </div>
  )
}
