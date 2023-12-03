export default {
  cupcakes: {
    default: {
      source: {
        path: '/',
        routeFragment: '/',
        next: {}
      
      },
      notFound: '*'
      // exact: true,
    },
    checkout: {
      path: '/checkout',
      routeFragment: '/checkout',
      next: {
        success: {
          path: '/checkout/checkout-success',
          routeFragment: '/checkout',
          next: {}
        },
        cancel: {
          path: '/checkout/checkout-cancel',
          routeFragment: '/checkout',
          next: {}
        }
      }
      // exact: true,
    },
    location: {
      path: '/location',
      routeFragment: '/location',
      next: {}
    },
  }
}
