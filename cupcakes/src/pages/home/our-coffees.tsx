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
import { Input } from '@components/ui/input'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger
} from '@components/ui/menubar'

import { cn } from '@lib/utils'
import { CardTag } from './components/card-tag'

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
  const controller = new AbortController()

  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const [coffeesStripe, setCoffeesStripe] = useState<ICoffee[]>([])

  const [inputValueSearchCoffee, setInputValueSearchCoffee] = useState('')
  const [clickCoffeeFiltering, setClickCoffeeFiltering] = useState('GERAL ☕')

  const [
    filterCoffeesByTypeClickCoffeeState,
    setFilterCoffeesByTypeClickCoffeeState
  ] = useState<ICoffee[]>([])

  const filterCoffeesSearch =
    inputValueSearchCoffee.length > 0
      ? filterCoffeesByTypeClickCoffeeState.filter(coffee =>
          coffee.name
            .toLowerCase()
            .includes(inputValueSearchCoffee.toLocaleLowerCase())
        )
      : []

  // const inputValueSearchCoffee = useRef<HTMLInputElement | undefined>(undefined)

  // const filterCoffees =
  //   inputValueSearchCoffee.current?.value.length as  number > 0
  //     ? coffeesStripe.filter(coffee =>
  //         coffee.name
  //           .toLowerCase()
  //           .includes(inputValueSearchCoffee.current!.value.toLocaleLowerCase())
  //       )
  //     : []

  // const filterCoffeesByTypeClickCoffee = (clickCoffee: string) => {
  //   const coffeesStripeFilter = coffeesStripe.filter(coffee => {
  //     const filteredTags = coffee.tags.filter(
  //       tag => tag.toLocaleLowerCase() === clickCoffee.toLocaleLowerCase()
  //     )

  //     console.log({
  //       type: clickCoffee.toLocaleLowerCase(),
  //       tag: coffee.tags,
  //       filteredTags: filteredTags
  //     })

  //     return filteredTags.length > 0
  //   })

  //   console.log(coffeesStripeFilter)
  //   return coffeesStripeFilter
  // }

  // https://chat.openai.com/c/60d4f32c-a654-452b-a94e-fcaff4d7c228
  const filterCoffeesByTypeClickCoffee = (clickCoffee: string) => {
    // Se a tag retornar true ele adiciona o product no array, se retornar false ele não adiciona.
    const coffeesStripeFilter = coffeesStripe.filter(coffee => {
      const hasMatchingTag = coffee.tags.some(
        tag => tag.toLocaleLowerCase() === clickCoffee.toLocaleLowerCase()
      )

      return hasMatchingTag
    })

    setFilterCoffeesByTypeClickCoffeeState(coffeesStripeFilter)
  }

  const onHeaderClickCoffeeFiltering = (clickCoffee: string) => {
    if (clickCoffee === clickCoffeeFiltering) {
      toast({
        title: `Ops! Você já está nessa opção!  ${clickCoffeeFiltering}`,
        description: 'Selecione outra opção para filtrar os produtos!',
        duration: 5000,
        variant: 'alert'
      })
      return
    }

    if (clickCoffee === 'GERAL ☕') {
      setClickCoffeeFiltering(clickCoffee)
      setFilterCoffeesByTypeClickCoffeeState(coffeesStripe)
      toast({
        title: `Você selecionou a opção: ${clickCoffee}`,
        description: 'Agora você pode filtrar os produtos!',
        duration: 5000,
        variant: 'success'
      })
      return
    }
    toast({
      title: `Você selecionou a opção: ${clickCoffee}`,
      description: 'Agora você pode filtrar os produtos!',
      duration: 5000,
      variant: 'success'
    })
    filterCoffeesByTypeClickCoffee(clickCoffee)
    setClickCoffeeFiltering(clickCoffee)
  }

  const menuItemsTags = coffeesStripe.reduce(
    (
      acc: {
        coffeeTag: { text: string; shortcut: string; id: string }
        coffeeId: string
      }[],
      coffee
    ) => {
      coffee.tags.forEach(tag => {
        // Pra cada tag é criado um objeto com as propriedades text, shortcut e id
        const tagObject = {
          text: tag,
          shortcut: tag,
          id: tag
        }

        // Verifica se a tag já existe no array acc antes de adicioná-la, se o some retorna true ele não adiciona, se retorna false ele adiciona. True porque ja existe essa tag dentro do acc, false porque não existe.
        if (!acc.some(item => item.coffeeTag.text === tagObject.text)) {
          acc.push({
            coffeeTag: tagObject,
            coffeeId: coffee.id
          })
        }
      })

      return acc
    },
    []
  )
  // const menuItems = [
  //   {
  //     text: 'GERAL ☕',
  //     shortcut: '☕'
  //     // onClick: () => onHeaderClickCoffeeFiltering('GERAL ☕')
  //   },
  //   {
  //     text: 'BOLINHO 🧁',
  //     shortcut: '🧁'
  //     // onClick: () => onHeaderClickCoffeeFiltering('BOLINHO/DOCE 🧁')
  //   },
  //   {
  //     text: 'BEBIDAS ☕',
  //     shortcut: '☕'
  //     // onClick: () => onHeaderClickCoffeeFiltering('BEBIDAS ☕')
  //   },
  //   {
  //     text: 'SALGADOS 🥪',
  //     shortcut: '🥪'
  //     // onClick: () => onHeaderClickCoffeeFiltering('SALGADOS 🥪')
  //   }
  // ]

  // const menuItems = coffeesStripe.map(coffee => ({
  //   coffeeTag: coffee.tags.map(tag => ({
  //     text: tag,
  //     shortcut: tag,
  //     id: tag
  //   })),
  //   coffeeId: coffee.id
  // }))

  // https://chat.openai.com/c/60d4f32c-a654-452b-a94e-fcaff4d7c228

  useEffect(() => {
    const getCoffees = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/products-all', {
          signal: controller.signal
        })

        setCoffeesStripe(data)
        setFilterCoffeesByTypeClickCoffeeState(data)
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

  // useEffect(() => {
  //   if(search.length){

  //   }
  // }, [search])
  return (
    <div className="min-h-[34rem] flex flex-col gap-4">
      <h2 className="leading-[130%] font-extrabold text-center md:text-start text-2xl lg:text-4xl  tracking-wide">
        Nossos cafés ☕
      </h2>
      <div className="flex flex-col lg:flex-row gap-2 items-center justify-center sticky top-20">
        <Input
          className="text-1xl placeholder:text-xs sm:placeholder:text-2xl text-center placeholder:text-foreground/60 text-foreground/80 bg-accent/90 transition-all w-full lg:w-[36rem] hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:bg-accent/100 focus-visible:bg-accent/100 hover:text-foreground/100 focus-visible:text-foreground/100 focus-visible:placeholder:text-foreground/100 hover:placeholder:text-foreground/100"
          placeholder={
            clickCoffeeFiltering === 'GERAL ☕'
              ? 'Qual produto você deseja ?'
              : `Qual produto você deseja em ${clickCoffeeFiltering} ?`
          }
          value={inputValueSearchCoffee}
          // ref={inputValueSearchCoffee as React.RefObject<HTMLInputElement>}
          // onChange={e => {
          //   inputValueSearchCoffee.current!.value = e.target.value
          // }}
          onChange={e => setInputValueSearchCoffee(e.target.value)}
        />
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger
              className={cn(
                'bg-foreground hover:bg-accent text-accent hover:text-foreground transition-all cursor-pointer',
                clickCoffeeFiltering !== 'GERAL ☕' &&
                  'bg-accent text-foreground'
              )}
            >
              {clickCoffeeFiltering === 'GERAL ☕'
                ? `${clickCoffeeFiltering} Filtrar opções`
                : clickCoffeeFiltering}
            </MenubarTrigger>
            <MenubarContent className="w-full h-[30vh] overflow-auto  ">
              {/* {coffeesStripe.map(item => (
                <>
                  {item.tags.map(tag => (
         
                  ))}
                </>
              ))} */}
              <>
                {menuItemsTags.map(item => (
                  <CardTag
                    onClick={() => {
                      onHeaderClickCoffeeFiltering(item.coffeeTag.text)
                    }}
                    key={item.coffeeTag.id}
                    coffeeTag={{
                      text: item.coffeeTag.text,
                      shortcut: item.coffeeTag.shortcut,
                      id: item.coffeeTag.id
                    }}
                  />
                ))}

                <CardTag
                  onClick={() => {
                    onHeaderClickCoffeeFiltering('GERAL ☕')
                  }}
                  coffeeTag={{
                    text: 'GERAL ☕',
                    shortcut: '☕',
                    id: 'GERAL ☕'
                  }}
                />
              </>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      {loading && <LoaderDefault>Carregando os cafés...</LoaderDefault>}

      <div className="flex flex-col items-center justify-center md817:grid md817:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">
        {!loading && (
          <>
            {filterCoffeesSearch.length > 0
              ? filterCoffeesSearch.map(coffee => (
                  <CoffeeCard key={coffee.id} coffee={coffee} />
                ))
              : filterCoffeesByTypeClickCoffeeState.map(coffee => (
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
