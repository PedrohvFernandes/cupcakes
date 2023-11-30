import { ControllerProducts } from './infra/controller/controller-product'
import { Router } from 'express'

export const routes = Router()

routes.get('/products-all', new ControllerProducts().GetAllProductsController)
