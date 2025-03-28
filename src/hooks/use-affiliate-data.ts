import useSWR from "swr"
import type { AffiliateData } from "@/types"

// Mock fetcher function - in a real app, this would call your API
const fetchAffiliateData = async (): Promise<AffiliateData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate daily data for the last 60 days
  const daily = Array.from({ length: 60 }).map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (59 - i))
    const day = date.getDate()
    const month = date.getMonth() + 1

    // Generate some random data with an upward trend
    const clicks = Math.floor(Math.random() * 50) + 10 + i / 2
    const conversions = Math.floor(clicks * (Math.random() * 0.2 + 0.05))
    const earnings = conversions * (Math.random() * 20 + 10)

    return {
      label: `${month}/${day}`,
      clicks,
      conversions,
      earnings,
    }
  })

  // Generate weekly data (last 13 weeks)
  const weekly = Array.from({ length: 13 })
    .map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i * 7)
      const weekNum = Math.floor(i / 4) + 1
      const month = date.toLocaleString("default", { month: "short" })

      // Aggregate data from daily
      const startIdx = Math.max(0, daily.length - (i + 1) * 7)
      const endIdx = daily.length - i * 7
      const weekData = daily.slice(startIdx, endIdx)

      const clicks = weekData.reduce((sum, day) => sum + day.clicks, 0)
      const conversions = weekData.reduce((sum, day) => sum + day.conversions, 0)
      const earnings = weekData.reduce((sum, day) => sum + day.earnings, 0)

      return {
        label: `W${weekNum} ${month}`,
        clicks,
        conversions,
        earnings,
      }
    })
    .reverse()

  // Generate monthly data (last 12 months)
  const monthly = Array.from({ length: 12 }).map((_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    const month = date.toLocaleString("default", { month: "short" })

    // Generate some random data with an upward trend
    const clicks = Math.floor(Math.random() * 500) + 100 + i * 50
    const conversions = Math.floor(clicks * (Math.random() * 0.2 + 0.05))
    const earnings = conversions * (Math.random() * 20 + 10)

    return {
      label: month,
      clicks,
      conversions,
      earnings,
    }
  })

  // Return mock affiliate data
  return {
    user: {
      id: "user123",
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    stats: {
      totalEarnings: 4875.32,
      monthlyEarnings: 842.19,
      totalReferrals: 156,
      totalClicks: 3240,
      conversionRate: 4.81,
      activeLinks: 12,
      earningsChange: 12.5,
      monthlyEarningsChange: 8.3,
      referralsChange: 15.2,
      clicksChange: 5.7,
      conversionRateChange: 0.3,
    },
    performanceData: {
      daily,
      weekly,
      monthly,
      sources: [
        { name: "Social Media", percentage: 42 },
        { name: "Blog/Website", percentage: 28 },
        { name: "Email", percentage: 15 },
        { name: "Direct", percentage: 10 },
        { name: "Other", percentage: 5 },
      ],
    },
    products: [
      {
        id: "prod1",
        title: "Premium Membership",
        description: "Annual premium membership with exclusive benefits",
        image: "/placeholder.svg?height=300&width=400",
        price: 199.99,
        commission: 40.0,
      },
      {
        id: "prod2",
        title: "Standard Membership",
        description: "Monthly standard membership with great benefits",
        image: "/placeholder.svg?height=300&width=400",
        price: 19.99,
        commission: 4.0,
      },
      {
        id: "prod3",
        title: "Elite Membership",
        description: "Our top-tier membership with VIP benefits",
        image: "/placeholder.svg?height=300&width=400",
        price: 399.99,
        commission: 80.0,
      },
      {
        id: "prod4",
        title: "Gift Card",
        description: "Gift card for friends and family",
        image: "/placeholder.svg?height=300&width=400",
        price: 50.0,
        commission: 5.0,
      },
      {
        id: "prod5",
        title: "Weekend Spa Retreat",
        description: "Luxury spa weekend package",
        image: "/placeholder.svg?height=300&width=400",
        price: 299.99,
        commission: 45.0,
      },
    ],
    generatedLinks: [
      {
        id: "link1",
        url: "https://beforeyougogo.com/ref/product/prod1?aid=AF123456&utm_source=affiliate&utm_medium=referral",
        type: "product",
        name: "Premium Membership Link",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        clicks: 342,
        conversions: 18,
        earnings: 720.0,
      },
      {
        id: "link2",
        url: "https://beforeyougogo.com/ref/category/membership?aid=AF123456&utm_source=affiliate&utm_medium=referral&utm_campaign=summer2023",
        type: "category",
        name: "Membership Plans Link",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        clicks: 528,
        conversions: 24,
        earnings: 960.0,
      },
      {
        id: "link3",
        url: "https://beforeyougogo.com/ref/product/prod3?aid=AF123456&utm_source=affiliate&utm_medium=referral",
        type: "product",
        name: "Elite Membership Link",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        clicks: 156,
        conversions: 5,
        earnings: 400.0,
      },
      {
        id: "link4",
        url: "https://beforeyougogo.com/ref/special-offer?aid=AF123456&utm_source=affiliate&utm_medium=referral&utm_campaign=blackfriday",
        type: "custom",
        name: "Custom: special-offer",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        clicks: 89,
        conversions: 3,
        earnings: 120.0,
      },
    ],
  }
}

export function useAffiliateData() {
  const { data, error, isLoading, mutate } = useSWR("affiliate", fetchAffiliateData)

  return {
    affiliateData: data,
    isLoading,
    isError: error,
    mutate,
  }
}

