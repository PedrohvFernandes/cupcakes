import { createBrowserRouter } from 'react-router-dom'

import { ConfigRoutes } from '@config/index'

import { DefaultLayout } from './layouts/default-layout'
import { DefaultLayoutCheckout } from './layouts/default-layout-checkout'

import { NotFound } from './pages/exception/NotFound'
import { Home } from '@pages/home/Home'
import { Checkout } from '@pages/Checkout'
import { Location } from '@pages/location/Location'
import { ShoppingCart } from '@pages/ShoppingCart'

export const Router = createBrowserRouter([
  {
    path: ConfigRoutes.cupcakes.default.source,
    element: <DefaultLayout />,
    children: [
      {
        path: ConfigRoutes.cupcakes.default.source,
        element: <Home/>
      },
      {
        path: ConfigRoutes.cupcakes.location.path,
        element: <Location/>
      },
      {
        path: ConfigRoutes.cupcakes.shoppingCart.path,
        element: <ShoppingCart/>
      }
    ]
  },
  {
    path: ConfigRoutes.cupcakes.checkout.path,
    element: <DefaultLayoutCheckout />,
    children: [{
      path: ConfigRoutes.cupcakes.checkout.path,
      element: <Checkout/>
    }]
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
