// import Stripe from 'stripe'
import { ProductLengthNotFound, ProductNotFound } from '../error'
import { AbstractRepositoriesProduct } from '../abstract-repositories'
import { ICoffee } from '../interfaces'

// import { ConfigAuth } from '@config/index'

export class GetAllProductsService {
  constructor(private ProductRepository: AbstractRepositoriesProduct) {}

  // async execute(): Promise<Stripe.ApiListPromise<Stripe.Product> | Error>  {
  async execute(): Promise<ICoffee[] | Error> {
    // Da para usar o stripe para pegar os preços dos produtos pelo back, e dps passar pelo front. Lembrando que usamos o private key e nele temos o de test e o live, os produtos que você cadastrar no test não vão aparecer no live e vice-versa. Para mudar de test para live é só mudar a env VITE_ENVIRONMENT que decide se estamos em produção ou não.
    // const stripe = new Stripe(ConfigAuth.cupcakes.stripe.keys.private.key, {
    //   apiVersion: '2023-10-16',
    // })
    // const products = await stripe.products.list()

    const coffees = await this.ProductRepository.findAll()
    
    if (!coffees) {
      return new ProductNotFound()
    }

    if (coffees.length === 0) {
      return new ProductLengthNotFound()
    }
    return coffees
  }
}
