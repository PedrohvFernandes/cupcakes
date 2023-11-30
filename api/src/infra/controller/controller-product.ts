import { Request, Response } from 'express'
import { GetAllProductsService } from '../services/get-all-products'

export class ControllerProducts {
  async GetAllProductsController(
    request: Request,
    response: Response
  ): Promise<Response> {
    const result = await new GetAllProductsService().execute()

    if (result instanceof Error) {
      return response.status(400).json({ error: result.message })
    }
    
    return response.status(200).json(result)
  }
}
