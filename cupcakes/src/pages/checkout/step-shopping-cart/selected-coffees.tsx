import { useCart } from '@hooks/push-item-cart'

import { ConfirmationSection } from './confirmation-section'
import { CoffeeCartCard } from './coffee-cart-card'
import { Separator } from '@components/ui/separator'
import useGetWindowDimensions from '@hooks/get-window-dimensions'

export function SelectedCoffees() {
  const { cartItems } = useCart()

  const { width } = useGetWindowDimensions()

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl sm:text-3xl text-center">
        Cafés selecionados ☕
      </h1>

      <div className="flex flex-col bg-accent rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg p-5 gap-4">
        {width > 768 && (
          <div className="hidden md:flex justify-between items-center text-sm sm:text-base">
            <div className="flex items-center justify-between gap-6">
              <p>Produto</p>
              <p>Quantidade</p>
            </div>
            <p>Preço</p>
          </div>
        )}

        {cartItems.map(coffee => (
          <>
            <CoffeeCartCard key={coffee.id} coffee={coffee} />

            <Separator className="bg-primary" />
          </>
        ))}

        <ConfirmationSection />
      </div>
    </div>
  )
}
