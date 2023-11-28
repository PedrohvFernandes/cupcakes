import { ICoffee } from '@pages/home/typings'
// https://www.tabnews.com.br/matheuspazinati/biblioteca-immer-melhorando-a-legibilidade-de-um-estado-react-complexo
// O produce é uma função do immer que recebe um estado e uma função que vai modificar esse estado, e retorna um novo estado. Ele deixa o código mais legível e mais fácil de entender, nao alterando a forma do react ser perfomatico que é a questao da imutabilidade. Apenas a escrita do código será de forma mutável, mas por de baixo dos panos, esse código será convertido para um código imutável. Ou seja, você vai aproveitar o melhor dos dois mundos: A facilidade de entender o que está ocorrendo no estado (mutabilidade) sem comprometer a performance (imutabilidade). E quem fará isso por nós é uma biblioteca chamada immer.
import { produce } from 'immer'
import { createContext, ReactNode, useEffect, useState } from 'react'

// O item do carrinho
export interface CartItem extends ICoffee {
  quantity: number
}

// O type do contexto do carrinho
interface ICartContextType {
  // Os itens do carrinho
  cartItems: CartItem[]
  // A quantidade de itens no carrinho
  cartQuantity: number
  // O valor total dos itens no carrinho
  cartItemsTotal: number
  // Adiciona um item ao carrinho
  addCoffeeToCart: (coffee: CartItem) => void
  // Aumenta ou diminui a quantidade de um item no carrinho
  changeCartItemQuantity: (
    cartItemId: number,
    type: 'increase' | 'decrease'
  ) => void
  // Remove um item do carrinho
  removeCartItem: (cartItemId: number) => void
  // Limpa o carrinho
  cleanCart: () => void
}

// O contexto do carrinho com o type definido, que possui um provider e um consumer, no fim o provider é um componente que vai ficar por volta de todos os componentes que vão ter acesso ao contexto do carrinho  <CartContext.Provider>TODA A APLICAÇÃO </CartContext.Provider>
export const CartContext = createContext({} as ICartContextType)

// O provider do contexto do carrinho recebe como props o children que é o que vai ficar por volta desse contexto, que vai ter acesso a ele
interface ICartContextProviderProps {
  children: ReactNode
}

// A chave para armazenar os itens do carrinho no localStorage
const COFFEE_ITEMS_STORAGE_KEY = 'coffeeDelivery:cartItems'

// O provider do contexto do carrinho é um componente que vai ficar por volta de todos os componentes que vão ter acesso ao contexto do carrinho, sendo o children todos os componentes/a aplicação  que vão ter acesso a esse contexto
export function CartContextProvider({
  children
}: Readonly<ICartContextProviderProps>) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY)
    if (storedCartItems) {
      return JSON.parse(storedCartItems)
    }
    return []
  })

  const cartQuantity = cartItems.length

  const cartItemsTotal = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity
  }, 0)

  function addCoffeeToCart(coffee: CartItem) {
    const coffeeAlreadyExistsInCart = cartItems.findIndex(
      cartItem => cartItem.id === coffee.id
    )

    const newCart = produce(cartItems, draft => {
      if (coffeeAlreadyExistsInCart < 0) {
        draft.push(coffee)
      } else {
        draft[coffeeAlreadyExistsInCart].quantity += coffee.quantity
      }
    })

    setCartItems(newCart)
  }

  function changeCartItemQuantity(
    cartItemId: number,
    type: 'increase' | 'decrease'
  ) {
    const newCart = produce(cartItems, draft => {
      const coffeeExistsInCart = cartItems.findIndex(
        cartItem => cartItem.id === cartItemId
      )

      if (coffeeExistsInCart >= 0) {
        const item = draft[coffeeExistsInCart]
        draft[coffeeExistsInCart].quantity =
          type === 'increase' ? item.quantity + 1 : item.quantity - 1
      }
    })

    setCartItems(newCart)
  }

  function removeCartItem(cartItemId: number) {
    const newCart = produce(cartItems, draft => {
      const coffeeExistsInCart = cartItems.findIndex(
        cartItem => cartItem.id === cartItemId
      )

      if (coffeeExistsInCart >= 0) {
        draft.splice(coffeeExistsInCart, 1)
      }
    })

    setCartItems(newCart)
  }

  function cleanCart() {
    setCartItems([])
  }

  useEffect(() => {
    localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  return (
    // O provider(provedor) do contexto do carrinho que fica por volta de todos os componentes que vão ter acesso a esse contexto, dentro do value é passado tudo que vai ser compartilhado com os componentes que vão ter acesso a esse contexto seja um state, uma função, um objeto, etc
    <CartContext.Provider
      value={{
        cartItems,
        addCoffeeToCart,
        cartQuantity,
        changeCartItemQuantity,
        removeCartItem,
        cartItemsTotal,
        cleanCart
      }}
    >
      {/* Aqui é tudo que vai ficar em volta dessa contexto, que vai ter acesso a isso, na maioria dos casos é a aplicação toda, a onde isso é feito no App.tsx ou main.tsx */}
      {children}
    </CartContext.Provider>
  )
}
