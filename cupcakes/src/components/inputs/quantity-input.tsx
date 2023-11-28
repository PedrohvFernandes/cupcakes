import { ButtonDefaultOutline } from '../buttons/button-default-outline'
import { Input } from '../ui/input'

import { Minus, Plus } from '@assets/icons'

interface IQuantityInputProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function QuantityInput({
  quantity,
  onIncrease,
  onDecrease
}: Readonly<IQuantityInputProps>) {
  return (
    <div className="flex-1 flex items-center justify-between gap-1 rounded-sm bg-primary">
      <ButtonDefaultOutline
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="outline-none border-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus />
      </ButtonDefaultOutline>
      <Input
        type="number"
        readOnly
        value={quantity}
        className="text-center w-full bg-transparent outline-none border-none cursor-default focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <ButtonDefaultOutline
        onClick={onIncrease}
        className="outline-none border-none"
      >
        <Plus />
      </ButtonDefaultOutline>
    </div>
  )
}
