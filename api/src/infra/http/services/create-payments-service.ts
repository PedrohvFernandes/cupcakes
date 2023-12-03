import { AbstractRepositoriesPayment } from '../abstract-repositories'
import { ErrorOnCreatePayment } from '../error/error-on-create-payment'
import { ICoffeePaymentRequest } from '../interfaces'


export class CreatePaymentsService {
  constructor(private PaymentRepository: AbstractRepositoriesPayment) {}

  async execute(PaymentsCoffee: ICoffeePaymentRequest): Promise<string | Error> {

    const payment = await this.PaymentRepository.createPayment(PaymentsCoffee)

    if (!payment) {
      return new ErrorOnCreatePayment()
    }

    return payment
  }
}
