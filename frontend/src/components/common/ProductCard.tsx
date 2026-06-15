import { Eye, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Rating } from '@/components/common/Rating'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import type { Product } from '@/types/product'
import { formatPrice } from '@/utils/formatPrice'

interface ProductCardProps {
  product: Product
  showDiscount?: boolean
  showNew?: boolean
}

export function ProductCard({ product, showDiscount = false, showNew = true }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)

  return (
    <div className="group w-[270px] shrink-0">
      <div className="relative overflow-hidden rounded-figma bg-bg-light">
        {product.isNewArrival && showNew && (
          <span className="absolute left-3 top-3 z-10 rounded-figma bg-green-500 px-2 py-1 text-figma-xs text-white font-medium">
            NEW
          </span>
        )}
        {showDiscount && (
          <span
            className={`absolute left-3 ${showDiscount ? 'top-3' : 'top-12'} z-10 rounded-figma bg-primary px-3 py-1 text-figma-xs text-white`}
          >
            -{product.discount}%
          </span>
        )}

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white transition-colors hover:bg-bg-light"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={wishlisted ? 'fill-primary text-primary' : 'text-secondary'}
            />
          </button>
          <Link
            to={`/products/${product.id}`}
            aria-label="Quick view"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white transition-colors hover:bg-bg-light"
          >
            <Eye size={16} strokeWidth={1.5} className="text-secondary" />
          </Link>
        </div>

        <Link to={`/products/${product.id}`} className="block">
          <div className="flex h-[250px] items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[180px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 right-0 bg-secondary py-2 text-figma-base text-white transform translate-y-full opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          Add To Cart
        </button>
      </div>

        <div className="mt-3 space-y-2">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-figma-base font-medium text-secondary transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-col items-start gap-1">
          <span className="text-figma-base font-medium text-primary">
            {formatPrice(product.price)}
          </span>
          {showDiscount && (
            <span className="text-figma-sm text-text-light line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
          <div className="flex items-center gap-2">
            {product.colors?.slice(0,3).map((c) => (
              <span
                key={c.name}
                className="h-3 w-3 rounded-full ring-1 ring-white/10"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
