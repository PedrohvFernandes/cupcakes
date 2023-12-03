import { ICoffeeRequest } from '../interfaces'

export abstract class AbstractRepositoriesPayment {
  abstract createPayment(paymentRequest: ICoffeeRequest): Promise<string | null>
}