import { useEffect, useState } from 'react'

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

type coffeeFiltering =
  | 'PRODUTOS GERAL ☕'
  | 'BOLINHO/DOCE 🧁'
  | 'BEBIDAS ☕'
  | 'SALGADOS 🥪'
  | 'LIMPAR FILTRO 🧹'

export function Home() {
  const { toast } = useToast()

  const [clickCoffeeFiltering, setClickCoffeeFiltering] =
    useState<coffeeFiltering>('LIMPAR FILTRO 🧹')

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
      text: 'PRODUTOS GERAL ☕',
      shortcut: '☕',
      onClick: () => onHeaderClickCoffeeFiltering('PRODUTOS GERAL ☕')
    },
    {
      text: 'BOLINHO/DOCE 🧁',
      shortcut: '🧁',
      onClick: () => onHeaderClickCoffeeFiltering('BOLINHO/DOCE 🧁')
    },
    {
      text: 'BEBIDAS ☕',
      shortcut: '☕',
      onClick: () => onHeaderClickCoffeeFiltering('BEBIDAS ☕')
    },
    {
      text: 'SALGADOS 🥪',
      shortcut: '🥪',
      onClick: () => onHeaderClickCoffeeFiltering('SALGADOS 🥪')
    },
    {
      text: 'LIMPAR FILTRO 🧹',
      shortcut: 'LIMPAR 🧹',
      onClick: () => onHeaderClickCoffeeFiltering('LIMPAR FILTRO 🧹')
    }
  ]

  useEffect(() => {
    toast({
      title: 'Bem vindo ao nosso site!',
      description: 'Aqui você encontra os melhores produtos para o seu dia!',
      duration: 5000,
      variant: 'success'
    })
  }, [])
  return (
    <>
      <Toaster />
      <section className="container flex flex-col gap-2">
        <Intro />
        {/* Apos fazer a intro, o search e o menu deixar responsivo */}
        <div className="flex items-center justify-center">
          <Input
            className="placeholder:text-2xl text-2xl text-center placeholder:text-foreground/80 text-foreground/80 bg-accent/80 transition-all w-[36rem] hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:bg-accent/100 focus-visible:bg-accent/100 hover:text-foreground/100 focus-visible:text-foreground/100"
            placeholder="Qual café ? ☕"
          />
        </div>
        <div className="flex items-center justify-center">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="bg-foreground hover:bg-accent text-accent hover:text-foreground transition-all">
                {clickCoffeeFiltering !== 'LIMPAR FILTRO 🧹'
                  ? clickCoffeeFiltering
                  : 'Quer filtrar as opções ? 🤔'}
              </MenubarTrigger>
              <MenubarContent>
                {menuItems.map(item => (
                  <div onClick={item.onClick} key={item.text}>
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

        {/* Mais abaixo vem os produtos de acordo com o search e de acordo com a opção selecionada no menu */}
        {/* Cada produto vai ter + - a quantidade e o botão com um carrinho e outro de comprar(o de comprar ja leva direto ao stripe e ao mesmo tempo adiciona no carrinho, porque caso o cliente cancele no stripe ele fica armazenada temporariamente no carrinho), o preço, o name(title), categoria e a descrição e a imagem */}

        {/* Por enquanto eu quero poder listar os produtos, fazer o search, o menu, levar os itens para o carrinho e levar ja direto pro stripe apos clicar no botao comprar junto com quantidade que o usuario selecionou */}

        {/* Posteriormente criar uma tela para cada produto para ter uma descrição mais ampla e com o seus subtipos(small, medium...) como esta no figma */}
        {/* <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p> */}
      </section>
    </>
  )
}
