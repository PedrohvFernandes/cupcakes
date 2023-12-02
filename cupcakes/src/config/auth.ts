const isDev = import.meta.env.VITE_ENVIRONMENT === 'development'

export default {
  cupcakes: {
    google: {
      keys: {
        maps: {
          id: 'google-map-script',
          key: import.meta.env.VITE_GOOGLE_CLOUD_MAPS_CUPCAKES_API_KEY as string
        }
      }
    },
    stripe: {
      keys: {
        private: {
          key: isDev
            ? import.meta.env.VITE_STRIPE_CUPCAKES_API_PRIVATE_KEY_TEST as string
            : import.meta.env.VITE_STRIPE_CUPCAKES_API_PRIVATE_KEY_LIVE as string
        },
        public: {
          key: isDev
            ? import.meta.env.VITE_STRIPE_CUPCAKES_API_PUBLIC_KEY_TEST
            : import.meta.env.VITE_STRIPE_CUPCAKES_API_PUBLIC_KEY_LIVE
        }
      }
    }
  }
}
