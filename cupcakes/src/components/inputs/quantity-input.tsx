import { cn } from '@lib/utils'
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
    <div className="flex-1 flex items-center justify-between gap-1 rounded-sm">
      <ButtonDefaultOutline
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={cn(quantity <= 1 && 'opacity-50 cursor-not-allowed')}
      >
        <Minus />
      </ButtonDefaultOutline>
      <Input
        type="number"
        readOnly
        value={quantity}
        className="text-center w-full bg-transparent"
      />
      <ButtonDefaultOutline onClick={onIncrease}>
        <Plus />
      </ButtonDefaultOutline>
    </div>
  )
}
