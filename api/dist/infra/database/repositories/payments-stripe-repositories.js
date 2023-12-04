"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepositoryStripe = void 0;
const index_1 = require("../../../config/index");
const stripe_1 = require("../../../lib/stripe");
class PaymentRepositoryStripe {
    constructor() {
        this.StripeRepository = stripe_1.stripe;
    }
    async createPayment(paymentRequest) {
        // https://www.youtube.com/watch?v=72iEz5iopqQ -> video que explica como fazer o checkout com o stripe
        const line_items = paymentRequest.map(item => {
            return {
                price: item.default_price,
                quantity: item.quantity,
                adjustable_quantity: {
                    enabled: true,
                    // minimum: 1,
                    // maximum: 20,
                },
            };
        });
        const session = await this.StripeRepository.checkout.sessions.create({
            payment_method_types: ['card'],
            invoice_creation: {
                enabled: true,
            },
            shipping_address_collection: {
                allowed_countries: ['BR',],
            },
            // Aqui eu posso passar o email do cliente, mas se eu não passar, o stripe vai pedir o email do cliente
            // customer_email: 'pedrohv20fernandes@gmail.com',
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'brl',
                        },
                        display_name: 'Retirar na cafeteria',
                        // delivery_estimate: {
                        //   minimum: {
                        //     unit: 'business_day',
                        //     value: 1,
                        //   },
                        //   maximum: {
                        //     unit: 'business_day',
                        //     value: 1,
                        //   },
                        // },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        tax_behavior: 'exclusive',
                        fixed_amount: {
                            amount: 1500,
                            currency: 'brl',
                        },
                        display_name: 'No mesmo dia',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            // O line items basicamente é um array de objetos dos produtos que o cliente está comprando, e dentro desse objeto tem o price_data, que é o preço do produto, e o quantity, que é a quantidade do produto
            line_items,
            // line_items: [
            //   {
            //     // atraves do id do price que vem do produto eu consigo recuperar o produto
            //     price: paymentRequest.default_price,
            //     // Mas se quiser pode passar todas as informações do produto, como no exemplo abaixo
            //     // price_data: {
            //     //   currency: 'brl',
            //       // product_data: {
            //       //   name: paymentRequest.name,
            //       //   description: paymentRequest.description,
            //       //   images: paymentRequest.images,
            //       //   metadata: {
            //       //     category: paymentRequest.metadata.category,
            //       //     name: paymentRequest.metadata.name ?? paymentRequest.name,
            //       //     size: paymentRequest.metadata.size
            //       //   }
            //       // },
            //       // unit_amount: paymentRequest.price * 100,
            //       // unit_amount_decimal: String(paymentRequest.price * 100)
            //     // },
            //     quantity: paymentRequest.quantity
            //   }
            //   // E aqui vem mais produtos
            // ],
            phone_number_collection: {
                enabled: true
            },
            custom_text: {
                submit: {
                    message: 'Ao pagar você ira receber um email de confirmação com o seu pedido'
                },
            },
            locale: 'pt-BR',
            mode: 'payment',
            // https://stripe.com/docs/payments/checkout/custom-success-page
            success_url: `${index_1.ConfigBases.cupcakes.baseUrls.frontend}/checkout/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${index_1.ConfigBases.cupcakes.baseUrls.frontend}/checkout/checkout-cancel`
        });
        return session.url;
    }
}
exports.PaymentRepositoryStripe = PaymentRepositoryStripe;
