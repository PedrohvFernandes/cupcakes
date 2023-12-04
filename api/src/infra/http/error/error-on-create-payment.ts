export class ErrorOnCreatePayment extends Error {
  constructor() {
    super('serviço de pagamento indisponível');
  }
}