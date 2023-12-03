import { Request, Response } from 'express'
import { GetAllProductsService } from '../services/get-all-products-service'
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

    return response.status(200).json(result)
  }

  // Se eu quiser criar um produto novo ou pesquisar um produto especifico, eu posso criar um novo metodo aqui e chamar ele no router.ts, mas tem que estar relacionado a produtos. E ao criar o metodo eu crio um service para ele e um repository para ele, e dentro do service ele utiliza os metodos do repository passado para ele
}
