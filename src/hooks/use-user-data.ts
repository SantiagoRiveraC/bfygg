import useSWR from "swr"
import type { User } from "@/types"

// Mock fetcher function - in a real app, this would call your API
const fetchUserData = async (): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock user data
  return {
    id: "user123",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    loyaltyPoints: 2450,
    membershipTier: "Premium",
    tierProgress: 65,
    nextRewardPoints: 500,
    monthlyPoints: 120,
  }
}

export function useUserData() {
  const { data, error, isLoading, mutate } = useSWR("user", fetchUserData)

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  }
}

