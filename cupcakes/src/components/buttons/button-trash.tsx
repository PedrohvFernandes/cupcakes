import { useCart } from '@hooks/push-item-cart'
import { ButtonDefaultOutline } from './button-default-outline'
import { Trash2 } from 'lucide-react'

interface IButtonTrashProps {
  coffeeId: string
  children: React.ReactNode
}

export function ButtonTrash({ coffeeId, children }: Readonly<IButtonTrashProps>) {
  const { removeCartItem } = useCart()

  
  function handleRemove() {
    removeCartItem(coffeeId)
  }

  return (
    <ButtonDefaultOutline
      onClick={handleRemove}
      variantBgOutline={'destructive'}
      className="flex gap-2"
    >
      <Trash2 />
      {children}
    </ButtonDefaultOutline>
  )
}
