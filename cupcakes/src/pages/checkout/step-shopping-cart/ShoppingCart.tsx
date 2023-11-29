import { SelectedCoffees } from './selected-coffees'

export function ShoppingCart() {

  return (
    <div className="container">
     
      <SelectedCoffees/>

      {/* faz o calculo dos preços dos produtos, o frete fixo vai ser so la no stripe(Lembrar de ver se no stripe tem como fixar um frete, retirar na loja...) aqui na aplicação na parte de frete vamos colocar um aviso informando que o frete sera calculado na parte do pagamento(checkout)*/}
      {/* Apos o cliente clicar no botão confirmar pedido(checkout), levar o mesmo para o stripe*/}
      {/* Apos ele confirmar o pedido levar para a tela de checkout finalized agradecendo pela compra, pedindo para olhar email para confirmar tudo certinho... */}
      {/* Caso recuse ou saia da tela do stripe  tentar levar para uma tela checkout canceled */}
      {/* Caso o pagamento de errado ver se eu consigo tratar isso ou o proprio stripe, se eu conseguir levar para o site informando que o pedido nao foi possivel ser realizado */}

      {/* Tentar colocar a opção pix com outro tip de lib */}
    </div>
  )
}
