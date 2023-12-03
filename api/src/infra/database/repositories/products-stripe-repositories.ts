import Stripe from 'stripe'

import { AbstractRepositoriesProduct } from '@infra/http/abstract-repositories'
import { IProduct, IProductRequest, IProducts } from '@infra/http/interfaces'

import { ConfigAuth } from '@config/index'

// Implementação do repositório de Produto do Stripe
export class ProductsRepositoryStripe implements AbstractRepositoriesProduct {
  // https://stripe.com/docs/api/products/object
  // https://stripe.com/docs/api/products/create
  // Basicamente estou inicializando o stripe como um repositório, e passando a chave privada do stripe, ele pode criar, editar, filtrar e etc os produtos, alem de poder realizar pagamentos com ele
  private StripeRepository = new Stripe(
    ConfigAuth.cupcakes.stripe.keys.private.key,
    {
      apiVersion: '2023-10-16'
    }
  )

  findOne(id: string): Promise<IProduct | null> {
    throw new Error('Method not implemented.')
  }

  findOneBy(name: string): Promise<IProduct | null> {
    throw new Error('Method not implemented.')
  }

  // Incerto
  async findById(id: string): Promise<IProduct | null> {
    const product = await this.StripeRepository.products.retrieve(id)
    return product as unknown as IProduct
  }

  // Implementado corretamente
  async findAll(): Promise<IProducts> {
    // Ele retorna um objeto que possui uma lista dentro
    const products = await this.StripeRepository.products.list()
    return products as unknown as IProducts
  }

  // Incerto
  async create(productRequest: IProductRequest): Promise<void> {
    await this.StripeRepository.products.create(productRequest)
  }

  // Incerto
  async deleteProductFindById(id: string): Promise<void> {
    await this.StripeRepository.products.del(id)
  }

  // Incerto
  async updateProductFindById(product: IProduct): Promise<void> {
    await this.StripeRepository.products.update(
      product.id,
      product as unknown as Stripe.ProductUpdateParams
    )
  }
}
