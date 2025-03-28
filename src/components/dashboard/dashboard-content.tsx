"use client"

import { useState } from "react"
import { useUserData } from "@/hooks/use-user-data"
import { useProducts } from "@/hooks/use-products"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import PointsCard from "@/components/dashboard/points-card"
import ProductGrid from "@/components/dashboard/product-grid"
import RedeemModal from "@/components/dashboard/redeem-modal"
import type { Product } from "@/types"

export default function DashboardContent() {
  const { user, isLoading: isUserLoading, mutate: mutateUser } = useUserData()
  const { products, isLoading: isProductsLoading } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRedeemClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleRedeemConfirm = async (usePoints: boolean) => {
    if (!selectedProduct || !user) return

    if (usePoints) {
      // In a real app, this would be an API call to redeem with points
      const newPointsBalance = Number(user.loyaltyPoints) - Number(selectedProduct.pointsPrice)

      // Optimistically update the UI
      mutateUser(
        {
          ...user,
          loyaltyPoints: newPointsBalance,
        },
        false,
      )

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Confirm the update
      mutateUser()
    } else {
      // Handle payment with real money (would redirect to checkout in a real app)
      console.log("Redirecting to payment gateway...")
      // This would typically redirect to a checkout page
    }

    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader user={user} isLoading={isUserLoading} />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <PointsCard user={user} isLoading={isUserLoading} />
        </div>

        <div className="md:col-span-2">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Recommended Products</h2>
          <ProductGrid products={products} isLoading={isProductsLoading} onRedeemClick={handleRedeemClick} />
        </div>
      </div>

      {selectedProduct && (
        <RedeemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          userPoints={user?.loyaltyPoints || 0}
          onConfirm={handleRedeemConfirm}
        />
      )}
    </div>
  )
}

