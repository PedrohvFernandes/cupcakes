import { ConfigBases } from '@config/index'
import { AbstractRepositoriesPayment } from '@infra/http/abstract-repositories'
import { ICoffeeRequest } from '@infra/http/interfaces'

import { stripe } from '@lib/stripe'

export class PaymentRepositoryStripe implements AbstractRepositoriesPayment {
  private StripeRepository = stripe

  async createPayment(paymentRequest: ICoffeeRequest): Promise<string | null> {
    const session = await this.StripeRepository.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'BRL',
            product_data: {
              name: paymentRequest.name,
              description: paymentRequest.description,
              images: paymentRequest.images
            }

            // unit_amount: paymentRequest.price
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${ConfigBases.cupcakes.baseUrls.frontend}/checkout-success`,
      cancel_url: `${ConfigBases.cupcakes.baseUrls.frontend}/checkout-cancel`
    })

    return session.url
  }
}
