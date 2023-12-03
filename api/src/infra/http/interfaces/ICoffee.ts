// Basicamente eu olhei o type de retorno da api do stripe e criei essas interfaces, e quando enviar para o banco basta usar essas interfaces. Porque quem me prove os produtos é o stripe e se eu quero padronizar o type, entao tenho que me basear com o retorno dele
// https://stripe.com/docs/api/products/object
// https://stripe.com/docs/api/products/create
// interface IProduct {
//   id: string
//   object: string
//   active: boolean
//   created: number
//   default_price: null | string // -> Nao é o preço mas sim o id de price daquele produto
//   description: string
//   features: []
//   images: []
//   livemode: false
//   // O metadata eu adaptei com o que eu coloco no cadastro dos produtos no Stripe
//   metadata: {
//     category: string
//     name: string
//     size: string
//   }
//   name: string
//   package_dimensions: null
//   shippable: null
//   statement_descriptor: null
//   tax_code: null
//   unit_label: null
//   updated: number
//   url: null
// }

// interface IProducts {
//   object: string
//   data: IProduct[]
// }

interface ICoffee {
  id: string
  tags: string[]
  name: string
  description: string
  price: number
  default_price: string
  size: string
  photo: string[]
}

// Aqui ainda é um incerteza, porque eu nao sei se o stripe vai me retornar o mesmo tipo de objeto quando eu for criar um produto, mas eu acho que sim
interface ICoffeeRequest {
  name: string
  description: string
  default_price: string
  price: number
  metadata: {
    category: string
    name: string
    size: string
  }
  images: string[]
  features: []
}

export { ICoffeeRequest, ICoffee }
