"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepositoryStripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const index_1 = require("../../../config/index");
// Implementação do repositório de Produto do Stripe
class ProductsRepositoryStripe {
    constructor() {
        // https://stripe.com/docs/api/products/object
        // https://stripe.com/docs/api/products/create
        // Basicamente estou inicializando o stripe como um repositório, e passando a chave privada do stripe, ele pode criar, editar, filtrar e etc os produtos, alem de poder realizar pagamentos com ele
        this.StripeRepository = new stripe_1.default(index_1.ConfigAuth.cupcakes.stripe.keys.private.key, {
            apiVersion: '2023-10-16'
        });
    }
    findOne(id) {
        throw new Error('Method not implemented.');
    }
    findOneBy(name) {
        throw new Error('Method not implemented.');
    }
    // Incerto
    async findById(id) {
        const product = await this.StripeRepository.products.retrieve(id);
        return product;
    }
    // Implementado corretamente
    async findAll() {
        // Ele retorna um objeto que possui uma lista dentro
        const products = await this.StripeRepository.products.list();
        return products;
    }
    // Incerto
    async create(productRequest) {
        await this.StripeRepository.products.create(productRequest);
    }
    // Incerto
    async deleteProductFindById(id) {
        await this.StripeRepository.products.del(id);
    }
    // Incerto
    async updateProductFindById(product) {
        await this.StripeRepository.products.update(product.id, product);
    }
}
exports.ProductsRepositoryStripe = ProductsRepositoryStripe;
