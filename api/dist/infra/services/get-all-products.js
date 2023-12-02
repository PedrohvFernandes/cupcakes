"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductsService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const product_not_found_1 = require("../error/product-not-found");
const index_1 = require("../../config/index");
class GetAllProductsService {
    async execute() {
        // Da para usar o stripe para pegar os preços dos produtos pelo back, e dps passar pelo front. Lembrando que usamos o private key e nele temos o de test e o live, os produtos que você cadastrar no test não vão aparecer no live e vice-versa. Para mudar de test para live é só mudar a env VITE_ENVIRONMENT que decide se estamos em produção ou não.
        const stripe = new stripe_1.default(index_1.ConfigAuth.cupcakes.stripe.keys.private.key, {
            apiVersion: '2023-10-16',
        });
        const products = await stripe.products.list();
        console.log(index_1.ConfigAuth.cupcakes.stripe.keys.private.key);
        if (products === null) {
            return new product_not_found_1.ProductNotFound();
        }
        return products;
    }
}
exports.GetAllProductsService = GetAllProductsService;
