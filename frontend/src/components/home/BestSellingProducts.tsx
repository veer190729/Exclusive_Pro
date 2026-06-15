import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/common/ProductCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types/product'

interface BestSellingProductsProps {
  products: Product[]
}

export function BestSellingProducts({ products }: BestSellingProductsProps) {
  return (
    <section className="section-figma">
      <SectionHeading tag="This Month" title="Best Selling Products" className="mb-[60px]" />

      <div className="flex flex-wrap justify-center gap-[30px] lg:justify-start">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} showDiscount={false} />
        ))}
      </div>

      <div className="mt-[60px] flex justify-center">
        <Link to="/products?section=best-selling">
          <Button size="lg">View All Products</Button>
        </Link>
      </div>
    </section>
  )
}
