const isDev = process.env.ENVIRONMENT === 'development'

export default {
  cupcakes: {
    stripe: {
      keys: {
        private: {
          key: isDev
            ? process.env.STRIPE_CUPCAKES_API_PRIVATE_KEY_TEST as string
            : process.env.STRIPE_CUPCAKES_API_PRIVATE_KEY_LIVE as string
        },
        public: {
          key: isDev
            ? process.env.STRIPE_CUPCAKES_API_PUBLIC_KEY_TEST as string
            : process.env.STRIPE_CUPCAKES_API_PUBLIC_KEY_LIVE as string
        }
      }
    }
  }
}
