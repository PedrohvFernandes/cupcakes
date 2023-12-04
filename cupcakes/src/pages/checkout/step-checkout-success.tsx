import Stripe from 'stripe'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AxiosError } from 'axios'

import { useCart } from '@hooks/push-item-cart'

import { useToast } from '@components/ui/use-toast'
import { Toaster } from '@components/ui/toaster'

import { stripe } from '@lib/stripe'

import { ConfigRoutes } from '@config/index'

import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'
import { Separator } from '@components/ui/separator'
import { formatMoney } from '@utils/format-money'

interface ICheckoutSuccessCustomerProps {
  id: string
  address: {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: string
  }
  email: string
  name: string
  phone: string
}

interface ICheckoutSuccessSessionProps {
  amount_total: number
  amount_subtotal: number
  status: string
}

interface ICheckoutSuccessShippingCostProps {
  display_name: string
  fixed_amount: {
    amount: number
    currency: string
  }
}

interface ICheckoutSuccessItemsCartsProps {
  data: {
    amount_total: number
    description: string
    quantity: number
    id: string
  }[]
}

export function CheckoutSuccess() {
  const { cleanCart } = useCart()
  const { toast } = useToast()

  // https://cursos.alura.com.br/forum/topico-duvida-como-passar-e-capturar-mais-de-um-parametro-com-o-hook-useparams-270322
  const [
    searchParams
    // setSearchParams
  ] = useSearchParams()

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [sessionCheckoutSuccessCustomer, setSessionCheckoutSuccessCustomer] =
    useState<ICheckoutSuccessCustomerProps>()

  const [sessionCheckoutSuccessSession, setSessionCheckoutSuccessSession] =
    useState<ICheckoutSuccessSessionProps>()

  const [
    sessionCheckoutSuccessShippingCost,
    setSessionCheckoutSuccessShippingCost
  ] = useState<ICheckoutSuccessShippingCostProps>()

  const [sessionCheckoutSuccessItemsCart, setSessionCheckoutSuccessItemsCart] =
    useState<ICheckoutSuccessItemsCartsProps>()

  const idSessionCheckout = searchParams.get('session_id')

  const formatterNumber = ({
    numberFormat,
    isMoney
  }: {
    numberFormat: number
    isMoney: boolean
  }) => {
    if (isMoney) {
      return formatMoney(numberFormat / 100)
    }
    return numberFormat / 100
  }

  useEffect(() => {
    if (idSessionCheckout !== null) {
      toast({
        title: 'Sua compra foi finalizada',
        description: `Compra finalizada com sucesso`,
        variant: 'success',
        duration: 5000
      })
      cleanCart()

      const getSuccessSessionCheckout = async () => {
        try {
          setLoading(true)
          const session = await stripe.checkout.sessions.retrieve(
            idSessionCheckout
          )

          setSessionCheckoutSuccessSession(
            session as ICheckoutSuccessSessionProps & Stripe.Checkout.Session
          )

          const customer = await stripe.customers.retrieve(
            session.customer as string
          )

          setSessionCheckoutSuccessCustomer(
            customer as ICheckoutSuccessCustomerProps & Stripe.Customer
          )

          const shippingCost = await stripe.shippingRates.retrieve(
            session.shipping_cost?.shipping_rate as string
          )
          setSessionCheckoutSuccessShippingCost(
            shippingCost as ICheckoutSuccessShippingCostProps &
              Stripe.ShippingRate
          )

          const itemsCart = await stripe.checkout.sessions.listLineItems(
            idSessionCheckout
          )
          setSessionCheckoutSuccessItemsCart(
            itemsCart as ICheckoutSuccessItemsCartsProps &
              Stripe.ApiList<Stripe.LineItem>
          )
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

      getSuccessSessionCheckout()

      return
    }

    navigate(ConfigRoutes.cupcakes.default.source.path)
  }, [])

  return (
    <>
      <Toaster />
      <div className="container flex flex-col gap-4 min-h-[34rem]">
        {!loading ? (
          <>
            {sessionCheckoutSuccessSession?.status === 'complete' ? (
              <>
                <div className="flex flex-col gap-2">
                  <h1 className="leading-[130%] font-extrabold text-1xl md:text-2xl lg:text-5xl text-center text-primary-backgroundIcons tracking-wide bg-accent p-2 rounded">
                    Uhuuuu! Seu pedido foi confirmado
                  </h1>
                  <p className="leading-[130%] text-sm md:text-base lg:text-lg text-center tracking-widest bg-accent/50 text-foreground/80 p-2 rounded">
                    Agora é so aguardar que logo o café chegar até você
                  </p>
                  <p className="leading-[130%] text-sm md:text-base lg:text-lg text-center tracking-widest bg-accent/50 text-foreground/80 p-2 rounded">
                    Detalhe enviamos uma confirmação do seu pedido para o seu
                    email 😊
                  </p>
                </div>

                <section className="flex items-center w-full h-full">
                  <div className="p-4 rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg bg-primary-foreground min-w[32rem] flex flex-col gap-8 border w-full text-foreground sm:text-start text-center sm:text-lg text-sm">
                    <h2 className="leading-[130%] tracking-widest bg-accent/50 text-foreground/80 p-2 rounded text-center sm:text-2xl text-sm">
                      Resumo do seu pedido:
                    </h2>
                    <strong>
                      Nome: {sessionCheckoutSuccessCustomer?.name}
                    </strong>
                    <strong>
                      Email: {sessionCheckoutSuccessCustomer?.email}
                    </strong>
                    <strong>
                      Telefone: {sessionCheckoutSuccessCustomer?.phone}
                    </strong>
                    <strong>Endereço:</strong>
                    <div className="flex flex-col gap-2 sm:ml-6 ml-0">
                      <strong>
                        Cidade: {sessionCheckoutSuccessCustomer?.address.city}
                      </strong>
                      <strong>
                        Estado: {sessionCheckoutSuccessCustomer?.address.state}
                      </strong>
                      <strong>
                        País: {sessionCheckoutSuccessCustomer?.address.country}
                      </strong>
                      <strong>
                        CEP:{' '}
                        {sessionCheckoutSuccessCustomer?.address.postal_code}
                      </strong>
                      <strong>
                        Rua: {sessionCheckoutSuccessCustomer?.address.line1}
                      </strong>
                      <strong>
                        Endereço 2:{' '}
                        {sessionCheckoutSuccessCustomer?.address.line2}
                      </strong>
                    </div>
                    <strong>
                      Frete: {sessionCheckoutSuccessShippingCost?.display_name}
                    </strong>
                    <strong>
                      Valor do frete:{' '}
                      {(sessionCheckoutSuccessShippingCost?.fixed_amount
                        .amount as number) === 0
                        ? 'Grátis'
                        : `R$ ${formatterNumber({
                            numberFormat: sessionCheckoutSuccessShippingCost
                              ?.fixed_amount.amount as number,
                            isMoney: true
                          })}`}
                    </strong>
                    <strong>
                      Total da compra: R${' '}
                      {formatterNumber({
                        numberFormat:
                          sessionCheckoutSuccessSession?.amount_total,
                        isMoney: true
                      })}
                    </strong>
                    <strong>
                      Subtotal da compra: R${' '}
                      {formatterNumber({
                        numberFormat:
                          sessionCheckoutSuccessSession?.amount_subtotal,
                        isMoney: true
                      })}
                    </strong>
                    <strong>
                      Status da compra: {sessionCheckoutSuccessSession?.status}
                    </strong>
                    <strong>Itens comprados: </strong>
                    {
                      // sessionCheckoutSuccessItemsCart?.data?.map(
                      //   (item, index) => (
                      //     <div key={index}>
                      //       <strong>
                      //         {item.description} - Quantidade: {item.quantity}
                      //       </strong>
                      //     </div>
                      //   )
                      // )
                      sessionCheckoutSuccessItemsCart?.data?.map(item => (
                        <div key={item.id}>
                          <Separator className="bg-primary" />

                          <div className="flex flex-col gap-4  sm:flex-row items-center justify-center sm:justify-between min-h-[8rem]">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                              <p className="text-sm font-bold text-center sm398:text-start">
                                {item.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <span className="leading-3">R$</span>
                              <strong className="text-sm">
                                {formatterNumber({
                                  numberFormat: item.amount_total,
                                  isMoney: true
                                })}
                              </strong>
                            </div>
                          </div>
                          <Separator className="bg-primary" />
                        </div>
                      ))
                    }
                  </div>
                </section>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="leading-[130%] font-extrabold text-1xl md:text-2xl lg:text-5xl text-center text-primary-backgroundIcons tracking-wide bg-accent p-2 rounded">
                  Ops! Algo deu errado, acho que essa compra não existe ou não
                  existe mais
                </h1>
                <p className="leading-[130%] text-sm md:text-base lg:text-lg text-center lg:text-start tracking-widest bg-accent/50 text-foreground/80 p-2 rounded">
                  Compra talvez inexistente
                </p>
              </div>
            )}
            <ButtonDefaultOutline
              className="mt-8"
              variantBgOutline={'success'}
              onClick={() =>
                navigate(ConfigRoutes.cupcakes.default.source.path)
              }
            >
              Voltar para home
            </ButtonDefaultOutline>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 min-h-[32rem]">
            <h1 className="leading-[130%] font-extrabold text-1xl md:text-2xl lg:text-5xl text-center lg:text-start text-primary-backgroundIcons tracking-wide bg-accent p-2 rounded">
              Carregando os dados do seu pedido...
            </h1>
            <p className="leading-[130%] text-sm md:text-base lg:text-lg text-center lg:text-start tracking-widest bg-accent/50 text-foreground/80 p-2 rounded">
              Aguarde um momento
            </p>
          </div>
        )}
      </div>
    </>
  )
}
