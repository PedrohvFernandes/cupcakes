import { useEffect, useState } from 'react'

import { useCart } from '@hooks/push-item-cart'

import {
  ButtonDefaultOutline,
  IButtonDefaultOutlineProps
} from './button-default-outline'

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
  const { cartItems, addCoffeeToCart } = useCart()

  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const controller = new AbortController()
  
  // Isso tudo a gente pode ver na hora de criar um link de pagamento no stripe:
  // Deixar o usuario quiser colocar a quantidade que quiser la no stripe(Possivel)
  // Inserir dados do cartao e localidade no stripe
  // Apos a compra enviar um email para o usuario
  // É possivel personalizar o email que o usuario recebe, o recibo...

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
      toast({
        title: 'Erro',
        description: `Compra realizada com sucesso`,
        variant: 'success',
        duration: 5000
      })

      location.href = data.url
    } catch (error) {
      toast({
        title: 'Erro',
        description: `Ocorreu um erro ao comprar o café ${error}`,
        variant: 'destructive',
        duration: 5000
      })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentWithOneItem = async () => {
    console.log(coffeeUnique)
    addCoffeeToCart(coffeeUnique as ICartItem)
    try {
      setLoading(true)
      const { data } = await api.post(
        '/create-checkout-session',
        {
          items: {
            quantity: coffeeUnique?.quantity,
            default_price: coffeeUnique?.default_price
          }
        },
        {
          signal: controller.signal
        }
      )

      location.href = data.url
    } catch (error) {
      toast({
        title: 'Erro',
        description: `Ocorreu um erro ao comprar o café ${error}`,
        variant: 'destructive',
        duration: 5000
      })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // nAO ESTA FUNCIONANDO
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <ButtonDefaultOutline
      className={clsx(className)}
      onClick={
        handlePaymentItemsOrOneItem === 'handlePaymentItems'
          ? handlePaymentItems
          : handlePaymentWithOneItem
      }
      variantBgOutline={variantBgOutline}
      disabled={loading}
      {...rest}
    >
      {loading ? 'Carregando...' : children}
    </ButtonDefaultOutline>
  )
}
