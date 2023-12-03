import { ICoffeeRequest, ICoffee } from '../interfaces'

// Essa asbtração vai servir para que eu possa criar um mock de um repository, para que eu possa testar o controller sem precisar de um banco de dados.
// Em service voce vai usar um repositorie que implemente essa classe abstract repositorie aqui
export abstract class AbstractRepositoriesProduct {
  abstract findById(id: string): Promise<ICoffee | null>
  abstract findAll(): Promise<ICoffee[]>
  abstract createProduct(CategoryRequest: ICoffeeRequest): Promise<void>
  abstract deleteProductFindById(id: string): Promise<void>
  abstract updateProductFindById(product: ICoffee): Promise<void>
}