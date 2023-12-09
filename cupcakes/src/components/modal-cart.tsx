import { useLocation, useNavigate } from 'react-router-dom'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@components/ui/sheet'

import { Check, ShoppingCart } from '@assets/icons'

import { BottomLine } from './bottom-line'
import { ButtonDefaultOutline } from './buttons/button-default-outline'
import { Separator } from './ui/separator'

import { ConfigRoutes } from '@config/index'

import { useCart } from '@hooks/push-item-cart'

import { QuantityInput } from './inputs/quantity-input'
import { ButtonTrash } from './buttons/button-trash'
import { ButtonKeepBuying } from './buttons/button-keep-buying'
import { ButtonSuccess } from './buttons/button-success'

export function ModalCart() {
  const { cartQuantity, cartItems, changeCartItemQuantity } = useCart()

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sheet>
      <SheetTrigger
        disabled={location.pathname === ConfigRoutes.cupcakes.checkout.path}
      >
        <BottomLine
          variantBottom={'bottom10'}
          path={ConfigRoutes.cupcakes.checkout.path}
        >
          <ButtonDefaultOutline
            path={ConfigRoutes.cupcakes.checkout.path}
            // onClick={() => navigate(ConfigRoutes.cupcakes.checkout.path)}
            className="w-12 sm:w-14 md:w-16"
          >
            <div className="relative">
              {cartQuantity >= 1 && (
                <span className="absolute flex items-center justify-center bottom-2 left-5 sm:left-9 w-5 h-5 rounded-lg bg-primary-backgroundIcons text-accent font-bold text-xs sm:text-sm">
                  {cartQuantity}
                </span>
              )}
            </div>
            <ShoppingCart />
          </ButtonDefaultOutline>
        </BottomLine>
      </SheetTrigger>
      {cartQuantity <= 0 ? (
        <SheetContent side={'right'} className="text-white">
          <SheetHeader>
            <SheetTitle className="text-center">
              Seu carrinho está vazio
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-4 p-2">
              <p className="text-center italic text-yellow-200 bg-accent/50 p-2 rounded ">
                Adicione itens ao seu carrinho para continuar
              </p>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex-col sm:flex-col">
            <SheetClose className="flex flex-col gap-2 items-center justify-center">
              <ButtonKeepBuying />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      ) : (
        <SheetContent side={'right'} className="text-white h-screen overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-center">
              Todos os itens do seu carrinho
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-4 p-2">
              {cartItems.map(coffee => (
                <div className="flex flex-col gap-2 text-white" key={coffee.id}>
                  <div className="flex gap-2">
                    <img src={`${coffee.photo}`} className="h-16" />

                    <strong>{coffee.name}</strong>
                    <p>Qtd: {coffee.quantity}</p>
                  </div>
                  <div className="flex flex-col  gap-2">
                    <QuantityInput
                      onDecrease={() =>
                        changeCartItemQuantity(coffee.id, 'decrease')
                      }
                      onIncrease={() =>
                        changeCartItemQuantity(coffee.id, 'increase')
                      }
                      quantity={coffee.quantity}
                      className="text-xs"
                    />

                    <ButtonTrash coffeeId={coffee.id}>REMOVER</ButtonTrash>
                  </div>
                  <Separator />
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex-col sm:flex-col p-2">
            <SheetClose className="flex flex-col gap-2 items-center justify-center">
              <ButtonSuccess
                onClick={() => navigate(ConfigRoutes.cupcakes.checkout.path)}
              >
                Confirmar pedido
                <Check />
              </ButtonSuccess>
              <ButtonKeepBuying />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  )
}
