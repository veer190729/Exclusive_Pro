import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/common/ProductCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types/product'

interface NewArrivalProps {
  products: Product[]
}

export function NewArrival({ products }: NewArrivalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    })
  }

  return (
    <section className="section-figma">
      <div className="mb-[60px] flex flex-wrap items-end justify-between gap-8">
        <SectionHeading tag="Featured" title="New Arrival" />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-bg-secondary transition-colors hover:bg-bg-light"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-bg-secondary transition-colors hover:bg-bg-light"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-[30px] overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showDiscount={false} />
        ))}
      </div>

      <div className="mt-[60px] flex justify-center">
        <Link to="/products?section=new-arrival">
          <Button size="lg">View All Products</Button>
        </Link>
      </div>
    </section>
  )
}
