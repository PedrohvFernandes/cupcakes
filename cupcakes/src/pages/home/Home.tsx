import { useEffect, useState } from 'react'

import { cn } from '@lib/utils'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@components/ui/menubar'

import { Input } from '@components/ui/input'
import { useToast } from '@components/ui/use-toast'
import { Toaster } from '@components/ui/toaster'
import { Intro } from './intro'
import { OurCoffees } from './our-coffees'

type coffeeFiltering =
  | 'GERAL ☕'
  | 'BOLINHO/DOCE 🧁'
  | 'BEBIDAS ☕'
  | 'SALGADOS 🥪'

export function Home() {
  const { toast } = useToast()

  const [clickCoffeeFiltering, setClickCoffeeFiltering] =
    useState<coffeeFiltering>('GERAL ☕')

  const onHeaderClickCoffeeFiltering = (clickCoffee: coffeeFiltering) => {
    if (clickCoffee === clickCoffeeFiltering) {
      toast({
        title: `Ops! Você já está nessa opção!  ${clickCoffeeFiltering}`,
        description: 'Selecione outra opção para filtrar os produtos!',
        duration: 5000,
        variant: 'alert'
      })
      return
    }
    toast({
      title: `Você selecionou a opção: ${clickCoffee}`,
      description: 'Agora você pode filtrar os produtos!',
      duration: 5000,
      variant: 'success'
    })
    setClickCoffeeFiltering(clickCoffee)
  }

  const menuItems = [
    {
      text: 'GERAL ☕',
      shortcut: '☕'
      // onClick: () => onHeaderClickCoffeeFiltering('GERAL ☕')
    },
    {
      text: 'BOLINHO/DOCE 🧁',
      shortcut: '🧁'
      // onClick: () => onHeaderClickCoffeeFiltering('BOLINHO/DOCE 🧁')
    },
    {
      text: 'BEBIDAS ☕',
      shortcut: '☕'
      // onClick: () => onHeaderClickCoffeeFiltering('BEBIDAS ☕')
    },
    {
      text: 'SALGADOS 🥪',
      shortcut: '🥪'
      // onClick: () => onHeaderClickCoffeeFiltering('SALGADOS 🥪')
    }
  ]

  useEffect(() => {
    toast({
      title: 'Bem vindo ao nosso site!',
      description:
        'Aqui você encontra os melhores cafés para animar o seu dia!',
      duration: 5000,
      variant: 'success'
    })
  }, [])
  
  return (
    <>
      <Toaster />

      <section className="container flex flex-col gap-4">
        {/* Colocar para funcionar o search e o menu */}
        <Intro />

        <div className="flex flex-col lg:flex-row gap-2 items-center justify-center sticky top-20">
          <Input
            className="text-1xl placeholder:text-1xl lg:placeholder:text-2xl lg:text-2xl text-center placeholder:text-foreground/60 text-foreground/80 bg-accent/90 transition-all w-full lg:w-[36rem] hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:bg-accent/100 focus-visible:bg-accent/100 hover:text-foreground/100 focus-visible:text-foreground/100 focus-visible:placeholder:text-foreground/100 hover:placeholder:text-foreground/100"
            placeholder="Qual café ? ☕"
          />
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger
                className={cn(
                  'bg-foreground hover:bg-accent text-accent hover:text-foreground transition-all',
                  clickCoffeeFiltering !== 'GERAL ☕' &&
                    'bg-accent text-foreground'
                )}
              >
                {clickCoffeeFiltering !== 'GERAL ☕'
                  ? clickCoffeeFiltering
                  : `${clickCoffeeFiltering} Filtrar opções`}
              </MenubarTrigger>
              <MenubarContent className="w-full">
                {menuItems.map(item => (
                  <div
                    // onClick={item.onClick}
                    onClick={() =>
                      onHeaderClickCoffeeFiltering(item.text as coffeeFiltering)
                    }
                    key={item.text}
                  >
                    <MenubarItem className="flex gap-2 items-center justify-center">
                      <span>{item.text}</span>
                      <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                  </div>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <OurCoffees />

        {/* Mais abaixo vem os produtos de acordo com o search e de acordo com a opção selecionada no menu */}
        {/* Por enquanto eu quero poder listar os produtos, fazer o search, o menu, levar os itens para o carrinho e levar ja direto pro stripe apos clicar no botao comprar junto com quantidade que o usuario selecionou */}

        {/* Posteriormente criar uma tela para cada produto para ter uma descrição mais ampla e com o seus subtipos(small, medium...) como esta no figma */}
      </section>
    </>
  )
}
