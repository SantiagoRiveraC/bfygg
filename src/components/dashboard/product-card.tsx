"use client"

import type { Product } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  onRedeemClick: () => void
}

export default function ProductCard({ product, onRedeemClick }: ProductCardProps) {
  const { title, description, image, price, pointsPrice, discount, isNew } = product

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {isNew && <Badge className="absolute left-3 top-3 bg-violet-600">New</Badge>}

        {discount && <Badge className="absolute right-3 top-3 bg-green-600">{discount}% Off</Badge>}
      </div>

      <CardContent className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
            <div className="flex items-center text-sm text-violet-600">
              <Gift className="mr-1 h-4 w-4" />
              <span>{pointsPrice} points</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 p-4">
        <Button onClick={onRedeemClick} className="w-full bg-violet-600 hover:bg-violet-700">
          Redeem Now
        </Button>
      </CardFooter>
    </Card>
  )
}

