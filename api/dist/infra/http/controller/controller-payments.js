"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerPayments = void 0;
const payments_stripe_repositories_1 = require("../../database/repositories/payments-stripe-repositories");
const create_payments_service_1 = require("../services/create-payments-service");
class ControllerPayments {
    async CreatePaymentController(request, response) {
        const PaymentsRepositoryStripe = new payments_stripe_repositories_1.PaymentRepositoryStripe();
        const { items } = request.body;
        const resultPayment = await new create_payments_service_1.CreatePaymentsService(PaymentsRepositoryStripe).execute(items);
        if (resultPayment instanceof Error) {
            return response.status(400).json({ error: resultPayment.message });
        }
        return response.send({
            url: resultPayment
        });
    }
}
exports.ControllerPayments = ControllerPayments;
