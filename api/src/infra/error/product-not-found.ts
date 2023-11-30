export class ProductNotFound extends Error {
  constructor() {
    super('Product not found');
  }
}