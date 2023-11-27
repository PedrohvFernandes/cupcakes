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
import useGetWindowDimensions from '@hooks/get-window-dimensions'

export function Home() {
  const { width } = useGetWindowDimensions()
  return (
    <section className="container">
      <Intro />
      {/* O search e o menu vai ficar um abaixo do outro, mas quando descer a tela vai ficar um do lado do outro dentro de uma div,  somente para celulares menores que vao ficar em um menu sanduíche */}
      {/* Menu que esta no figma, deixar ele grande usar o Menubar, para celular fazer um Combobox, isso para filtrar as opçoes em tela, quando rolar a tela essas opções e o search vai acompanhar ficando dentro de um div abaixo do header com uma distancia pequena dele*/}
      {/* Apos fazer a intro, o search e o menu deixar responsivo */}
      <div className="flex items-center justify-center">
        <Input
          className="placeholder:text-2xl text-2xl text-center placeholder:text-foreground/80 text-foreground/80 bg-accent/80 transition-all w-[36rem] hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:bg-accent/100 focus-visible:bg-accent/100 hover:text-foreground/100 focus-visible:text-foreground/100"
          placeholder="Qual café ? ☕"
        />
      </div>
      {width > 640 ? (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <></>
      )}

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
