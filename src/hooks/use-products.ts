import useSWR from "swr"
import type { Product } from "@/types"

// Mock fetcher function - in a real app, this would call your API
const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Return mock product data
  return [
    {
      id: "prod1",
      title: "Premium Wireless Headphones",
      description: "Experience crystal-clear sound with our premium noise-cancelling headphones.",
      image: "/placeholder.svg?height=300&width=400",
      price: 199.99,
      pointsPrice: 19999,
      discount: 15,
      isNew: true,
    },
    {
      id: "prod2",
      title: "Fitness Smartwatch",
      description: "Track your workouts, sleep, and more with this advanced fitness smartwatch.",
      image: "/placeholder.svg?height=300&width=400",
      price: 149.99,
      pointsPrice: 14999,
      discount: null,
      isNew: true,
    },
    {
      id: "prod3",
      title: "Portable Bluetooth Speaker",
      description: "Take your music anywhere with this waterproof, portable Bluetooth speaker.",
      image: "/placeholder.svg?height=300&width=400",
      price: 79.99,
      pointsPrice: 7999,
      discount: 10,
      isNew: false,
    },
    {
      id: "prod4",
      title: "Organic Coffee Subscription",
      description: "Premium organic coffee delivered to your door monthly. Perfect for coffee enthusiasts.",
      image: "/placeholder.svg?height=300&width=400",
      price: 24.99,
      pointsPrice: 2499,
      discount: null,
      isNew: false,
    },
    {
      id: "prod5",
      title: "Weekend Spa Retreat",
      description: "Relax and rejuvenate with our exclusive weekend spa package at luxury locations.",
      image: "/placeholder.svg?height=300&width=400",
      price: 299.99,
      pointsPrice: 29999,
      discount: 20,
      isNew: false,
    },
    {
      id: "prod6",
      title: "Wine Tasting Experience",
      description: "Guided wine tasting experience with a selection of premium wines and gourmet pairings.",
      image: "/placeholder.svg?height=300&width=400",
      price: 89.99,
      pointsPrice: 8999,
      discount: null,
      isNew: true,
    },
  ]
}

export function useProducts() {
  const { data, error, isLoading } = useSWR("products", fetchProducts)

  return {
    products: data,
    isLoading,
    isError: error,
  }
}

