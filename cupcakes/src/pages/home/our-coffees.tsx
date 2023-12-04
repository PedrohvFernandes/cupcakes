import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
// import Stripe from 'stripe'
// import { useEffect } from 'react'

// import { coffees } from '@data/coffees'
import { CoffeeCard } from './coffee-card'
import { ICoffee } from './typings'

import { api } from '@lib/axios'

import { useToast } from '@components/ui/use-toast'
import { LoaderDefault } from '@components/loaders/loader-default'
import { ButtonDefaultOutline } from '@components/buttons/button-default-outline'

// import { ConfigAuth } from '@config/index'

export function OurCoffees() {
  // Da para usar o stripe para pegar os preços dos produtos pelo front, mas por boa pratica é melhor pegar pelo back e passar para o front. Lembrando que usamos o private key e nele temos o de test e o live, os produtos que você cadastrar no test não vão aparecer no live e vice-versa. Para mudar de test para live é só mudar a env VITE_ENVIRONMENT que decide se estamos em produção ou não.
  // const stripe = new Stripe(ConfigAuth.cupcakes.stripe.keys.private.key, {
  //   apiVersion: '2023-10-16'
  // })

  // useEffect(() => {
  //   async function getProducts() {
  //     const products = await stripe.products.list()

  //     console.log(products)
  //   }

  //   getProducts()
  // })

  const [coffeesStripe, setCoffeesStripe] = useState<ICoffee[]>([])
  const [loading, setLoading] = useState(false)
  const controller = new AbortController()

  const { toast } = useToast()

  useEffect(() => {
    const getCoffees = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/products-all', {
          signal: controller.signal
        })

        setCoffeesStripe(data)
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

    getCoffees()

    return () => {
      controller.abort()
    }
  }, [])
  return (
    <div className="min-h-[34rem] flex flex-col gap-4">
      <h2 className="leading-[130%] font-extrabold text-center md:text-start text-2xl lg:text-4xl  tracking-wide">
        Nossos cafés ☕
      </h2>

      {loading && <LoaderDefault>Carregando os cafés...</LoaderDefault>}

      <div className="flex flex-col items-center justify-center md817:grid md817:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">
        {!loading && (
          <>
            {coffeesStripe.map(coffee => (
              // <div
              //   className="flex flex-col items-center justify-center gap-4 w-full"
              //   key={coffee.id}
              // >
              //   {/* <img src={coffee.image} alt={coffee.name} className="w-full rounded" /> */}
              //   <div className="flex flex-col items-center justify-center gap-2">
              //     <h3 className="text-lg font-bold text-center md:text-start">
              //       {coffee.name}
              //     </h3>
              //     <span className="text-sm text-center md:text-start">
              //       {coffee.description}
              //     </span>
              //     <span className="text-sm text-center md:text-start">
              //       {coffee.price}
              //     </span>
              //   </div>
              // </div>
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </>
        )}
      </div>
      {coffeesStripe.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-lg font-bold text-center md:text-start">
            Houve um erro ao carregar os cafés
          </p>
          <ButtonDefaultOutline
            variantBgOutline={'success'}
            onClick={() => window.location.reload()}
          >
            Recarregar
          </ButtonDefaultOutline>
        </div>
      )}
    </div>
  )
}
