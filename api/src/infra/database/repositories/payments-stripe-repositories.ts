import { ConfigBases } from '@config/index'
import { AbstractRepositoriesPayment } from '@infra/http/abstract-repositories'
import { ICoffeePaymentRequest } from '@infra/http/interfaces'

import { stripe } from '@lib/stripe'

export class PaymentRepositoryStripe implements AbstractRepositoriesPayment {
  private StripeRepository = stripe

  async createPayment(paymentRequest: ICoffeePaymentRequest): Promise<string | null> {
    console.log('createPayment: ',paymentRequest)
    const session = await this.StripeRepository.checkout.sessions.create({
      payment_method_types: ['card'],
      // O line items basicamente é um array de objetos dos produtos que o cliente está comprando, e dentro desse objeto tem o price_data, que é o preço do produto, e o quantity, que é a quantidade do produto
      line_items: [
        {
          // atraves do id do price que vem do produto eu consigo recuperar o produto
          price: paymentRequest.default_price,
          
          // Mas se quiser pode passar todas as informações do produto, como no exemplo abaixo 
          // price_data: {
          //   currency: 'brl',
            // product_data: {
            //   name: paymentRequest.name,
            //   description: paymentRequest.description,
            //   images: paymentRequest.images,
            //   metadata: {
            //     category: paymentRequest.metadata.category,
            //     name: paymentRequest.metadata.name ?? paymentRequest.name,
            //     size: paymentRequest.metadata.size
            //   }
            // },
            // unit_amount: paymentRequest.price * 100,
            // unit_amount_decimal: String(paymentRequest.price * 100)
          // },
          quantity: paymentRequest.quantity
        }
      ],
      mode: 'payment',
      success_url: `${ConfigBases.cupcakes.baseUrls.frontend}/checkout/checkout-success`,
      cancel_url: `${ConfigBases.cupcakes.baseUrls.frontend}/checkout/checkout-cancel`
    })

    return session.url
  }
}
