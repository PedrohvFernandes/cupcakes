export class ErrorOnCreatePayment extends Error {
  constructor() {
    super('Error on create payment');
  }
}