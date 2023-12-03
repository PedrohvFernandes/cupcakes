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
        const session = await this.StripeRepository.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'BRL',
                        product_data: {
                            name: paymentRequest.name,
                            description: paymentRequest.description,
                            images: paymentRequest.images
                        }
                        // unit_amount: paymentRequest.price
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${index_1.ConfigBases.cupcakes.baseUrls.frontend}/checkout-success`,
            cancel_url: `${index_1.ConfigBases.cupcakes.baseUrls.frontend}/checkout-cancel`
        });
        return session.url;
    }
}
exports.PaymentRepositoryStripe = PaymentRepositoryStripe;
