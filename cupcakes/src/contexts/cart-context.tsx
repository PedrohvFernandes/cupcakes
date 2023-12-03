import { ICoffee } from '@pages/home/typings'
// https://www.tabnews.com.br/matheuspazinati/biblioteca-immer-melhorando-a-legibilidade-de-um-estado-react-complexo
// O produce é uma função do immer que recebe um estado e uma função que vai modificar esse estado, e retorna um novo estado. Ele deixa o código mais legível e mais fácil de entender, nao alterando a forma do react ser perfomatico que é a questao da imutabilidade. Apenas a escrita do código será de forma mutável, mas por de baixo dos panos, esse código será convertido para um código imutável. Ou seja, você vai aproveitar o melhor dos dois mundos: A facilidade de entender o que está ocorrendo no estado (mutabilidade) sem comprometer a performance (imutabilidade). E quem fará isso por nós é uma biblioteca chamada immer. dessa forma evitamos de ficar passando o spread ...state, e sim apenas o state, por tras o immer vai fazer isso por nós, e o código fica mais legível.
import { produce } from 'immer'
import { createContext, ReactNode, useEffect, useState } from 'react'

// O item do carrinho
export interface ICartItem extends ICoffee {
  quantity: number
}

// O type do contexto do carrinho
interface ICartContextType {
  // Os itens do carrinho
  cartItems: ICartItem[]
  // A quantidade de itens no carrinho
  cartQuantity: number
  // O valor total dos itens no carrinho
  cartItemsTotal: number
  // Adiciona um item ao carrinho
  addCoffeeToCart: (coffee: ICartItem) => void
  // Aumenta ou diminui a quantidade de um item no carrinho
  changeCartItemQuantity: (
    cartItemId: string,
    type: 'increase' | 'decrease'
  ) => void
  // Remove um item do carrinho
  removeCartItem: (cartItemId: string) => void
  // Limpa o carrinho
  cleanCart: () => void
}

// O contexto do carrinho com o type definido, que possui um provider e um consumer, no fim o provider é um componente que vai ficar por volta de todos os componentes que vão ter acesso ao contexto do carrinho  <CartContext.Provider>TODA A APLICAÇÃO </CartContext.Provider>
export const CartContext = createContext({} as ICartContextType)

// O provider do contexto do carrinho recebe como props o children que é o que vai ficar por volta desse contexto, que vai ter acesso a ele
interface ICartContextProviderProps {
  children: ReactNode
}

// A chave:valor para armazenar os itens do carrinho no localStorage
const COFFEE_ITEMS_STORAGE_KEY = 'coffeeDelivery:cartItems'

// O provider do contexto do carrinho é um componente que vai ficar por volta de todos os componentes que vão ter acesso ao contexto do carrinho, sendo o children todos os componentes/a aplicação  que vão ter acesso a esse contexto
export function CartContextProvider({
  children
}: Readonly<ICartContextProviderProps>) {
  // O estado dos itens do carrinho, que é inicializado com os itens do localStorage
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    const storedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY)
    // Se existir itens no localStorage, retorna eles, se nao retorna um array vazio
    if (storedCartItems) {
      return JSON.parse(storedCartItems)
    }
    return []
  })

  // A quantidade de itens no carrinho
  const cartQuantity = cartItems.length

  // O valor total dos itens no carrinho
  const cartItemsTotal = cartItems.reduce((total, cartItem) => {
    // O total é o valor total + o preço do item * a quantidade do item, ou seja o total que ja tinha(o valor que ja foi somado do item anterior) mais o valor do item * a quantidade do item do proximo item do array, sempre internado
    return total + cartItem.price * cartItem.quantity
  }, 0)

  // Adiciona um item ao carrinho
  function addCoffeeToCart(coffee: ICartItem) {
    // O findIndex retorna o index do item que esta sendo procurado, se nao encontrar retorna -1
    const coffeeAlreadyExistsInCart = cartItems.findIndex(
      cartItem => cartItem.id === coffee.id
    )

    // o produce retorna um novo estado, ou seja, um novo array, que é o cartItems, e o draft é esse novo array, que é o novo estado, e o que esta dentro do produce é o que vai modificar esse novo estado, ou seja, o que esta dentro do produce é o que vai modificar o draft, que é o novo estado, que é o novo array, que é o novo cartItems. Basicamente o draft é o novo estado do cartItems, e o que esta dentro do produce é o que vai modificar esse novo estado, ou seja, o draft. O draft vira o state que voce passar como primeiro argumento
    const newCart = produce(cartItems, draft => {
      // Se o item nao existir no carrinho, adiciona ele, se nao aumenta a quantidade dele
      if (coffeeAlreadyExistsInCart < 0) {
        draft.push(coffee)
      } else {
        // O item ja existe no carrinho, entao aumenta a quantidade dele
        draft[coffeeAlreadyExistsInCart].quantity += coffee.quantity
      }
    })

    setCartItems(newCart)
  }

  // Aumenta ou diminui a quantidade de um item no carrinho com base no id do item
  function changeCartItemQuantity(
    cartItemId: string,
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

  function removeCartItem(cartItemId: string) {
    // Aqui novamente o produce retorna um novo estado, ou seja, um novo array que é o cartItems. So que no caso a gente remove o item do carrinho com base no id do item.
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
    // Sempre que o cartItems mudar, ele vai ser salvo no localStorage
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
