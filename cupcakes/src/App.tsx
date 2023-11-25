import { RouterProvider } from 'react-router-dom'

import { Router } from './routes'
import { CartContextProvider } from '@contexts/cart-context'

function App() {
  return (
    // <CartContextProvider>
      <RouterProvider router={Router} />
    // </CartContextProvider>
  )
}

export default App
