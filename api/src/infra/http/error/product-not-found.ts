export class ProductNotFound extends Error {
  constructor() {
    super('produto não encontrado');
  }
}