import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { useCart } from '@hooks/push-item-cart'

import {
  IButtonDefaultOutlineProps
} from './button-default-outline'
import { ButtonSuccess } from './button-success'

import { useToast } from '@components/ui/use-toast'

import { api } from '@lib/axios'

import clsx from 'clsx'

import { ICartItem } from '@contexts/cart-context'

interface IPayButtonStripeProps extends IButtonDefaultOutlineProps {
  children?: React.ReactNode
  className?: string
  coffeeUnique?: ICartItem
  handlePaymentItemsOrOneItem: 'handlePaymentItems' | 'withOneItem'
}

export function PayButtonStripe({
  children,
  className,
  coffeeUnique,
  handlePaymentItemsOrOneItem,
  variantBgOutline,
  ...rest
}: Readonly<IPayButtonStripeProps>) {
  const { cartItems, addCoffeeToCart, cartQuantity } = useCart()

  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const controller = new AbortController()

  const handlePaymentItems = async () => {
    try {
      setLoading(true)
      const { data } = await api.post(
        '/create-checkout-session',
        {
          items: cartItems.map(item => {
            return {
              quantity: item.quantity,
              default_price: item.default_price
            }
          })
        },
        {
          signal: controller.signal
        }
      )
      
      location.href = data.url
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Erro',
          description: `Ocorreu um erro ao comprar o café: ${
            error.response?.data.error === undefined
              ? error.name + ': ' + error.message
              : error.response?.data.error
          }`,
          variant: 'destructive',
          duration: 5000
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentWithOneItem = async () => {
    addCoffeeToCart(coffeeUnique as ICartItem)
    try {
      setLoading(true)
      const { data } = await api.post(
        '/create-checkout-session',
        {
          items: [
            {
              quantity: coffeeUnique?.quantity,
              default_price: coffeeUnique?.default_price
            }
          ]
        },
        {
          signal: controller.signal
        }
      )
      location.href = data.url
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Erro',
          description: `Ocorreu um erro ao comprar o café: ${
            error.response?.data.error === undefined
              ? error.name + ': ' + error.message
              : error.response?.data.error
          }`,
          variant: 'destructive',
          duration: 5000
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <ButtonSuccess
      className={clsx(className)}
      onClick={
        handlePaymentItemsOrOneItem === 'handlePaymentItems'
          ? handlePaymentItems
          : handlePaymentWithOneItem
      }
      disabled={
        (handlePaymentItemsOrOneItem === 'handlePaymentItems' &&
          cartQuantity <= 0) ||
        loading
      }
      {...rest}
    >
      {loading ? 'Carregando...' : children}
    </ButtonSuccess>
  )
}
