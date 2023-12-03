import { Request, Response } from 'express'
import { GetAllProductsService } from '../services/get-all-products'
import { ProductsRepositoryStripe } from '@infra/database/repositories/products-stripe-repositories'

export class ControllerProducts {
  async GetAllProductsController(
    request: Request,
    response: Response
  ): Promise<Response> {
    const ProductRepositoryStripe = new ProductsRepositoryStripe()

    // Por exemplo se eu quisesse passar outro repositorio, eu poderia passar aqui e ai ele implementaria da forma que quiser, seguindo os metodos da classe abstrata
    const result = await new GetAllProductsService(
      ProductRepositoryStripe
    ).execute()

    if (result instanceof Error) {
      return response.status(400).json({ error: result.message })
    }

    const products = result.data.map(product => {
      return {
        id: product.id,
        tags: product.metadata.category.split(', '),
        name: product.name,
        description: product.description,
        price: product.default_price,
        size: product.metadata.size,
        photo: product.images
      }
    })
    return response.status(200).json(products)
  }
}
