const isDev = process.env.ENVIRONMENT === 'development'

export default {
  cupcakes: {
    stripe: {
      keys: {
        private: {
          key: isDev
            ? process.env.STRIPE_CUPCAKES_API_PRIVATE_KEY_TEST
            : process.env.STRIPE_CUPCAKES_API_PRIVATE_KEY_LIVE
        },
        public: {
          key: isDev
            ? process.env.STRIPE_CUPCAKES_API_PUBLIC_KEY_TEST
            : process.env.STRIPE_CUPCAKES_API_PUBLIC_KEY_LIVE
        }
      }
    }
  }
}
