import { createBrowserRouter } from 'react-router-dom'

import { ConfigRoutes } from '@config/index'

import { DefaultLayout } from './layouts/default-layout'
import { DefaultLayoutCheckout } from './layouts/default-layout-checkout'

import { NotFound } from './pages/exception/NotFound'
import { Home } from '@pages/home/Home'
import { CheckoutSuccess } from '@pages/checkout/step-checkout-success'
import { CheckoutCancel } from '@pages/checkout/step-checkout-cancel'
import { Location } from '@pages/location/Location'
import { ShoppingCart } from '@pages/checkout/step-shopping-cart/ShoppingCart'

export const Router = createBrowserRouter([
  {
    path: ConfigRoutes.cupcakes.default.source.path,
    element: <DefaultLayout />,
    children: [
      {
        path: ConfigRoutes.cupcakes.default.source.path,
        element: <Home />
      },
      {
        path: ConfigRoutes.cupcakes.location.path,
        element: <Location />
      },
      {
        path: ConfigRoutes.cupcakes.checkout.path,
        element: <ShoppingCart />
      }
    ]
  },
  {
    path: ConfigRoutes.cupcakes.checkout.path,
    element: <DefaultLayoutCheckout />,
    children: [
      {
        path: ConfigRoutes.cupcakes.checkout.next.success.path,
        element: <CheckoutSuccess />
      },
      {
        path: ConfigRoutes.cupcakes.checkout.next.cancel.path,
        element: <CheckoutCancel />
      }
    ]
  },
  // {
  //   path: ConfigRoutes.cupcakes.default.notFound,
  //   element: <DefaultLayout />,
  //   children: [
  //     {
  //       path: ConfigRoutes.cupcakes.default.notFound,
  //       element: <NotFound />
  //     }
  //   ]
  // }
  {
    path: ConfigRoutes.cupcakes.default.notFound,
    element: <NotFound />
  }
])
