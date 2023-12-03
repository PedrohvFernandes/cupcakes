"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepositoryStripe = void 0;
const stripe_1 = require("../../../lib/stripe");
// Implementação do repositório de Produto do Stripe
class ProductsRepositoryStripe {
    constructor() {
        // https://stripe.com/docs/api/products/object
        // https://stripe.com/docs/api/products/create
        // Basicamente estou inicializando o stripe como um repositório, e passando a chave privada do stripe, ele pode criar, editar, filtrar e etc os produtos, alem de poder realizar pagamentos com ele
        this.StripeRepository = stripe_1.stripe;
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
        // Ele retorna um objeto que possui uma lista dentro, que é o data, e dentro do data tem os produtos
        const products = await this.StripeRepository.products.list();
        // A gente filtra os produtos para que ele fique no formato que a gente quer, e ai a gente retorna esse array de produtos filtrados
        const productsFilter = await Promise.all(products.data.map(async (product) => {
            const price = await stripe_1.stripe.prices.retrieve(product.default_price);
            return {
                id: product.id,
                tags: product.metadata.category.split(', '),
                name: product.name,
                description: product.description,
                price: price.unit_amount / 100, // O preço vem com 2 casas decimais a mais, então eu divido por 100 para tirar essas casas decimais, ou seja 3000 vira 30,00 
                size: product.metadata.size,
                photo: product.images
            };
        }));
        return productsFilter;
    }
    // Incerto
    async create(productRequest) {
        await this.StripeRepository.products.create({
            name: productRequest.name,
            description: productRequest.description,
            metadata: {
                category: productRequest.metadata.category,
                size: productRequest.metadata.size,
            },
            images: productRequest.images,
            active: true,
            type: 'good',
        });
    }
    // Incerto
    async deleteProductFindById(id) {
        await this.StripeRepository.products.del(id);
    }
    // Incerto
    async updateProductFindById(coffee) {
        await this.StripeRepository.products.update(coffee.id, coffee);
    }
}
exports.ProductsRepositoryStripe = ProductsRepositoryStripe;
