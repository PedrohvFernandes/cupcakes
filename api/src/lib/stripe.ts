import { ConfigAuth } from '@config/index'
import Stripe from 'stripe'

export const stripe = new Stripe(ConfigAuth.cupcakes.stripe.keys.private.key, {
  apiVersion: '2023-10-16'
})
