import { RouterProvider } from 'react-router-dom'

import { Router } from './routes'
import { CartContextProvider } from '@contexts/cart-context'

function App() {
  return (
    // O provider do contexto do carrinho circulando toda a aplicação
    <CartContextProvider>
      <RouterProvider router={Router} />
    </CartContextProvider>
  )
}

export default App
