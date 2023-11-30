import { ProductNotFound } from "../error/product-not-found"

export class GetAllProductsService {

  async execute(): Promise<string | Error>  {
    const product = null
    if(product === null) {
      return new ProductNotFound()
    }
    return 'Hello World'
  }
}