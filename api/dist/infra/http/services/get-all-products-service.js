"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductsService = void 0;
// import Stripe from 'stripe'
const error_1 = require("../error");
// import { ConfigAuth } from '../../../config/index'
class GetAllProductsService {
    constructor(ProductRepository) {
        this.ProductRepository = ProductRepository;
    }
    // async execute(): Promise<Stripe.ApiListPromise<Stripe.Product> | Error>  {
    async execute() {
        // Da para usar o stripe para pegar os preços dos produtos pelo back, e dps passar pelo front. Lembrando que usamos o private key e nele temos o de test e o live, os produtos que você cadastrar no test não vão aparecer no live e vice-versa. Para mudar de test para live é só mudar a env VITE_ENVIRONMENT que decide se estamos em produção ou não.
        // const stripe = new Stripe(ConfigAuth.cupcakes.stripe.keys.private.key, {
        //   apiVersion: '2023-10-16',
        // })
        // const products = await stripe.products.list()
        const coffees = await this.ProductRepository.findAll();
        if (!coffees) {
            return new error_1.ProductNotFound();
        }
        if (coffees.length === 0) {
            return new error_1.ProductLengthNotFound();
        }
        return coffees;
    }
}
exports.GetAllProductsService = GetAllProductsService;
