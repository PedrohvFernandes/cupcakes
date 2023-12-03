import { Request, Response } from 'express'
import { PaymentRepositoryStripe } from '@infra/database/repositories/payments-stripe-repositories'
import { CreatePaymentsService } from '../services/create-payments-service'

export class ControllerPayments {
  async CreatePaymentController(
    request: Request,
    response: Response
  ): Promise<Response> {
    const PaymentsRepositoryStripe = new PaymentRepositoryStripe()
    const { items } = request.body
    console.log('Request.body: ',request.body)
    const resultPayment = await new CreatePaymentsService(
      PaymentsRepositoryStripe
    ).execute(items)

    if (resultPayment instanceof Error) {
      return response.status(400).json({ error: resultPayment.message })
    }

    return response.send({
      url: resultPayment
    })
  }
}
