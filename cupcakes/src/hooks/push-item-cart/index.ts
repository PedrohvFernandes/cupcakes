import { useContext } from "react";
import { CartContext } from "@contexts/cart-context";

export function useCart() {
  const context = useContext(CartContext);
  return context;
}