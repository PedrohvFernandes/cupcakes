import { AbstractRepositoriesPayment } from '../abstract-repositories'
import { ErrorOnCreatePayment } from '../error/error-on-create-payment'
import { ICoffeeRequest } from '../interfaces'


export class CreatePaymentsService {
  constructor(private PaymentRepository: AbstractRepositoriesPayment) {}

  async execute(CoffeeRequest: ICoffeeRequest): Promise<string | Error> {

    const payment = await this.PaymentRepository.createPayment(CoffeeRequest)

    if (!payment) {
      return new ErrorOnCreatePayment()
    }

    return payment
  }
}
