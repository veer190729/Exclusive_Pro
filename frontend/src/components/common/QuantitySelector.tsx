import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  quantity: number
  onChange: (quantity: number) => void
  size?: 'sm' | 'md'
}

export function QuantitySelector({ quantity, onChange, size = 'md' }: QuantitySelectorProps) {
  const btnClass =
    size === 'sm'
      ? 'flex h-7 w-7 items-center justify-center border border-line-light text-secondary hover:bg-bg-light'
      : 'flex h-10 w-10 items-center justify-center border border-line-light text-secondary hover:bg-bg-light'

  return (
    <div className="inline-flex items-center rounded-figma">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className={`${btnClass} rounded-l-figma`}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 12 : 16} />
      </button>
      <span
        className={`flex items-center justify-center border-y border-line-light text-secondary ${
          size === 'sm' ? 'h-7 w-10 text-figma-sm' : 'h-10 w-16 text-figma-base'
        }`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className={`${btnClass} rounded-r-figma`}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 12 : 16} />
      </button>
    </div>
  )
}
