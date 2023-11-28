import { useContext } from "react";
import { CartContext } from "@contexts/cart-context";

export function useCart() {
  // Pegando o contexto do carrinho e os métodos de adicionar e remover itens... transformando em um hook
  const context = useContext(CartContext);
  return context;
}