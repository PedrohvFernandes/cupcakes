import { Intro } from './intro'

export function Home() {
  return (
    <section className="container">
      <Intro />
      {/* O search e o menu vai ficar um abaixo do outro, mas quando descer a tela vai ficar um do lado do outro dentro de uma div,  somente para celulares menores que vao ficar em um menu sanduíche */}
      {/* Search do produtos da loja */}
      {/* Menu que esta no figma, deixar ele grande usar o Menubar, para celular fazer um Combobox, isso para filtrar as opçoes em tela, quando rolar a tela essas opções e o search vai acompanhar ficando dentro de um div abaixo do header com uma distancia pequena dele*/}
      {/* Mais abaixo vem os produtos de acordo com o search e de acordo com a opção selecionada no menu */}
      {/* Cada produto vai ter + - a quantidade e o botão com um carrinho e outro de comprar(o de comprar ja leva direto ao stripe e ao mesmo tempo adiciona no carrinho, porque caso o cliente cancele no stripe ele fica armazenada temporariamente no carrinho), o preço, o name(title), categoria e a descrição e a imagem */}

      {/* Por enquanto eu quero poder listar os produtos, fazer o search, o menu, levar os itens para o carrinho e levar ja direto pro stripe apos clicar no botao comprar junto com quantidade que o usuario selecionou */}

      {/* Posteriormente criar uma tela para cada produto para ter uma descrição mais ampla e com o seus subtipos(small, medium...) como esta no figma */}
    </section>
  )
}
