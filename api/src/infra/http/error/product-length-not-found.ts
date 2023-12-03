export class ProductLengthNotFound extends Error {
  constructor() {
    super('Length of product not found');
  }
}