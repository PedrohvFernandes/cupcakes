import { ICoffeePaymentRequest } from '../interfaces'

export abstract class AbstractRepositoriesPayment {
  abstract createPayment(paymentRequest: ICoffeePaymentRequest[]): Promise<string | null>
}
