import Stripe from 'stripe'

import { AbstractRepositoriesProduct } from '@infra/http/abstract-repositories'
import { ICoffeeRequest, ICoffee } from '@infra/http/interfaces'

import { stripe } from '@lib/stripe'

// Implementação do repositório de Produto do Stripe
export class ProductsRepositoryStripe implements AbstractRepositoriesProduct {
  // https://stripe.com/docs/api/products/object
  // https://stripe.com/docs/api/products/create
  // Basicamente estou inicializando o stripe como um repositório, e passando a chave privada do stripe, ele pode criar, editar, filtrar e etc os produtos, alem de poder realizar pagamentos com ele
  private StripeRepository = stripe

  // Incerto
  async findById(id: string): Promise<ICoffee | null> {
    const product = await this.StripeRepository.products.retrieve(id)
    return product as unknown as ICoffee
  }

  // Implementado corretamente
  async findAll(): Promise<ICoffee[]> {
    // Ele retorna um objeto que possui uma lista dentro, que é o data, e dentro do data tem os produtos
    const products = await this.StripeRepository.products.list()
    // A gente filtra os produtos para que ele fique no formato que a gente quer, e ai a gente retorna esse array de produtos filtrados
    const productsFilter = await Promise.all(
      products.data.map(async product => {
        const price = await this.StripeRepository.prices.retrieve(
          product.default_price as string
        )
        return {
          id: product.id,
          tags: product.metadata.category.split(', '),
          name: product.name,
          description: product.description,
          price: (price.unit_amount as number) / 100, // O preço vem com 2 casas decimais a mais, então eu divido por 100 para tirar essas casas decimais, ou seja 3000 vira 30,00
          // O default_Price é o id do preço do produto
          default_price: product.default_price,
          size: product.metadata.size,
          photo: product.images
        }
      })
    )

    return productsFilter as ICoffee[]
  }

  // Incerto
  async createProduct(productRequest: ICoffeeRequest): Promise<void> {
    await this.StripeRepository.products.create({
      name: productRequest.name,
      description: productRequest.description,
      // https://stripe.com/docs/api/prices --> type do price, que basicamente esse default_price ele vai virar um objeto que para recuperar ele tem que passar o id gerado pelo stripe dele, dessa forma retornando um objeto com o id dele, o unit_amount e o unit_amount_decimal, entre outras coisas
      /*
        ex: aqui estou pegando o default_price do produto, e passando para o price, e ai eu consigo recuperar o price do produto, e ai eu consigo pegar o unit_amount e o unit_amount_decimal...
                const price = await this.StripeRepository.prices.retrieve(
          product.default_price as string
        )
      
      */
      default_price_data: {
        currency: 'brl',
        unit_amount: productRequest.price * 100,
        unit_amount_decimal: String(productRequest.price * 100)
      },
      features: productRequest.features,
      metadata: {
        category: productRequest.metadata.category,
        size: productRequest.metadata.size,
        name: productRequest.metadata.name ?? productRequest.name
      },
      images: productRequest.images,
      active: true,
      type: 'good'
    })
  }

  // Incerto
  async deleteProductFindById(id: string): Promise<void> {
    await this.StripeRepository.products.del(id)
  }

  // Incerto
  async updateProductFindById(coffee: ICoffee): Promise<void> {
    await this.StripeRepository.products.update(
      coffee.id,
      coffee as Stripe.ProductUpdateParams
    )
  }
}
