export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  loyaltyPoints?: number
  membershipTier?: string
  tierProgress?: number
  nextRewardPoints?: number
  monthlyPoints?: number
}

export interface Product {
  id: string
  title: string
  description: string
  image: string
  price: number
  pointsPrice?: number
  discount?: number | null
  isNew?: boolean
  commission?: number
}

export interface AffiliateStats {
  totalEarnings: number
  monthlyEarnings: number
  totalReferrals: number
  totalClicks: number
  conversionRate: number
  activeLinks: number
  earningsChange: number
  monthlyEarningsChange: number
  referralsChange: number
  clicksChange: number
  conversionRateChange: number
}

export interface PerformanceDataPoint {
  label: string
  clicks: number
  conversions: number
  earnings: number
}

export interface TrafficSource {
  name: string
  percentage: number
}

export interface PerformanceData {
  daily: PerformanceDataPoint[]
  weekly: PerformanceDataPoint[]
  monthly: PerformanceDataPoint[]
  sources: TrafficSource[]
}

export interface AffiliateLink {
  id: string
  url: string
  type: "product" | "category" | "custom"
  name: string
  createdAt: string
  clicks: number
  conversions: number
  earnings: number
}

export interface AffiliateData {
  user: User
  stats: AffiliateStats
  performanceData: PerformanceData
  products: Product[]
  generatedLinks: AffiliateLink[]
}

