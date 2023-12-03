import { ControllerPayments } from '@infra/http/controller/controller-payments'
import { ControllerProducts } from '@infra/http/controller/controller-product'
import { Router } from 'express'

export const routes = Router()

routes.get('/products-all', new ControllerProducts().GetAllProductsController)
routes.post('/create-checkout-session', new ControllerPayments().CreatePaymentController)
