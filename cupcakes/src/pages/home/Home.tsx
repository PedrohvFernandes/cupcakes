import { useState } from 'react'

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

import { Intro } from './intro'

type coffeeFiltering =
  | 'PRODUTOS GERAL ☕'
  | 'BOLINHO/DOCE 🧁'
  | 'BEBIDAS ☕'
  | 'SALGADOS 🥪'
  | ''

export function Home() {
  const [clickCoffeeFiltering, setClickCoffeeFiltering] =
    useState<coffeeFiltering>('')

  const onHeaderClickCoffeeFiltering = (
    clickCoffeeFiltering: coffeeFiltering
  ) => {
    setClickCoffeeFiltering(clickCoffeeFiltering)
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
      onClick: () => onHeaderClickCoffeeFiltering('')
    }
  ]
  return (
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
            <MenubarTrigger className="bg-foreground text-accent transition-all">
              {clickCoffeeFiltering !== ''
                ? clickCoffeeFiltering
                : 'Quer filtrar as opções ? 🤔'}
            </MenubarTrigger>
            <MenubarContent>
              {
                menuItems.map(item => (
                  <div onClick={item.onClick} key={item.text}>
                    <MenubarItem className="flex gap-2 items-center justify-center">
                      <span>{item.text}</span>
                      <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                  </div>
                ))
              }
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
  )
}
