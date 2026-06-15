import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/common/ProductCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types/product'

interface ExploreProductsProps {
  products: Product[]
}

export function ExploreProducts({ products }: ExploreProductsProps) {
  const displayProducts = products

  return (
    <section className="section-figma">
      <SectionHeading tag="Our Products" title="Explore Our Products" className="mb-[60px]" />

      <div className="flex flex-col gap-10">
        <div className="flex-1">
          <div className="flex flex-wrap justify-center lg:justify-start gap-[30px]">
            {displayProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} showDiscount={false} />
            ))}
          </div>

          <div className="mt-[60px] flex justify-center">
            <Link to="/products?section=explore">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
