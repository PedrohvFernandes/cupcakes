"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentsService = void 0;
const error_on_create_payment_1 = require("../error/error-on-create-payment");
class CreatePaymentsService {
    constructor(PaymentRepository) {
        this.PaymentRepository = PaymentRepository;
    }
    async execute(PaymentsCoffee) {
        const payment = await this.PaymentRepository.createPayment(PaymentsCoffee);
        if (!payment) {
            return new error_on_create_payment_1.ErrorOnCreatePayment();
        }
        return payment;
    }
}
exports.CreatePaymentsService = CreatePaymentsService;
