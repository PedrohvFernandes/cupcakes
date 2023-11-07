import { createBrowserRouter } from 'react-router-dom'

import { ConfigRoutes } from '@config/index'

import { DefaultLayout } from './layouts/default-layout'
import { DefaultLayoutCheckout } from './layouts/default-layout-checkout'
import { NotFound } from './pages/exception/NotFound'

export const Router = createBrowserRouter([
  {
    path: ConfigRoutes.cupcakes.default.source,
    element: <DefaultLayout />,
    children: [{}]
  },
  {
    path: ConfigRoutes.cupcakes.checkout.path,
    element: <DefaultLayoutCheckout />,
    children: [{}]
  },
  {
    path: ConfigRoutes.cupcakes.default.notFound,
    element: <DefaultLayout />,
    children: [
      {
        path: ConfigRoutes.cupcakes.default.notFound,
        element: <NotFound />
      }
    ]
  }
])
