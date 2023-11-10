export default {
  cupcakes: {
    default: {
      source: '/',
      notFound: '*'
      // exact: true,
    },
    checkout: {
      path: '/checkout',
      routeFragment: '/checkout',
      next: {
        confirm: {
          path: '/checkout/confirm',
          routeFragment: '/checkout',
          next: {}
        },
        canceled: {
          path: '/checkout/canceled',
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
    shoppingCart: {
      path: '/shopping-cart',
      routeFragment: '/shopping-cart',
      next: {}
    },
  }
}
