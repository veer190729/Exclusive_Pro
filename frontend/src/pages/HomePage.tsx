import { useEffect, useState } from 'react'
import { BestSellingProducts } from '@/components/home/BestSellingProducts'
import { ExploreProducts } from '@/components/home/ExploreProducts'
import { FlashSales } from '@/components/home/FlashSales'
import { HeroSection } from '@/components/home/HeroSection'
import { NewArrival } from '@/components/home/NewArrival'
import { Services } from '@/components/home/Services'
import { productService } from '@/services/productService'
import type { Product } from '@/types/product'

export function HomePage() {
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([])
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([])
  const [exploreProducts, setExploreProducts] = useState<Product[]>([])
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([])

  useEffect(() => {
    productService.getFlashSaleProducts().then(setFlashSaleProducts)
    productService
      .getAllProducts(1, 8, 'best-selling')
      .then((result) => setBestSellingProducts(result.data))
    productService
      .getAllProducts(1, 8, 'explore')
      .then((result) => setExploreProducts(result.data))
    productService
      .getAllProducts(1, 8, 'new-arrival')
      .then((result) => setNewArrivalProducts(result.data))
  }, [])

  return (
    <div className="pb-24">
      <HeroSection />
      <FlashSales products={flashSaleProducts} />
      <BestSellingProducts products={bestSellingProducts} />
      <ExploreProducts products={exploreProducts} />
      <NewArrival products={newArrivalProducts} />
      <Services />
    </div>
  )
}
