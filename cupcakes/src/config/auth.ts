export default {
  cupcakes: {
    google: {
      keys: {
        maps: {
          id: 'google-map-script',
          key: import.meta.env.VITE_GOOGLE_CLOUD_MAPS_CUPCAKES_API_KEY
        }
      }
    },
    stripe: {
      keys: {
        private: {
          key: import.meta.env.VITE_STRIPE_CUPCAKES_API_PRIVATE_KEY
        },
        public: {
          key: import.meta.env.VITE_STRIPE_CUPCAKES_API_PUBLIC_KEY
        }
      }
    }
  }
}
