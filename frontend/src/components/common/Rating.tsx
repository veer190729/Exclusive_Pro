import { Star } from 'lucide-react'

interface RatingProps {
  rating: number
  reviewCount: number
}

export function Rating({ rating, reviewCount }: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < rating ? 'fill-star text-star' : 'fill-transparent text-star'
            }
          />
        ))}
      </div>
      <span className="text-figma-sm font-semibold text-text-light">({reviewCount})</span>
    </div>
  )
}
