export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  image: string
  category: string
  isFlashSale?: boolean
  isBestSelling?: boolean
  isNewArrival?: boolean
  description?: string
  colors?: ProductColor[]
  sizes?: string[]
  images?: string[]
  inStock?: boolean
}
