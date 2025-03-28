import type { Product } from "@/types"
import ProductCard from "@/components/dashboard/product-card"
import ProductCardSkeleton from "@/components/dashboard/product-card-skeleton"

interface ProductGridProps {
  products: Product[] | undefined | null
  isLoading: boolean
  onRedeemClick: (product: Product) => void
}

export default function ProductGrid({ products, isLoading, onRedeemClick }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <p className="text-gray-600">No products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onRedeemClick={() => onRedeemClick(product)} />
      ))}
    </div>
  )
}

