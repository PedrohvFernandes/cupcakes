export class ProductLengthNotFound extends Error {
  constructor() {
    super('quantidade de produtos não encontrada');
  }
}