import type { AffiliateStats } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DollarSign, Users, MousePointer, BarChart3 } from "lucide-react"

interface StatsOverviewProps {
  stats: AffiliateStats | null | undefined
  isLoading: boolean
}

export default function StatsOverview({ stats, isLoading }: StatsOverviewProps) {
  const statCards = [
    {
      title: "Total Earnings",
      value: stats?.totalEarnings || 0,
      description: "Lifetime commission",
      icon: <DollarSign className="h-5 w-5 text-violet-600" />,
      format: (value: number) => `$${value.toFixed(2)}`,
      change: stats?.earningsChange || 0,
    },
    {
      title: "Monthly Earnings",
      value: stats?.monthlyEarnings || 0,
      description: "This month",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      format: (value: number) => `$${value.toFixed(2)}`,
      change: stats?.monthlyEarningsChange || 0,
    },
    {
      title: "Total Referrals",
      value: stats?.totalReferrals || 0,
      description: "Successful conversions",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      format: (value: number) => value.toString(),
      change: stats?.referralsChange || 0,
    },
    {
      title: "Link Clicks",
      value: stats?.totalClicks || 0,
      description: "All-time clicks",
      icon: <MousePointer className="h-5 w-5 text-orange-600" />,
      format: (value: number) => value.toString(),
      change: stats?.clicksChange || 0,
    },
    {
      title: "Conversion Rate",
      value: stats?.conversionRate || 0,
      description: "Clicks to sales",
      icon: <BarChart3 className="h-5 w-5 text-purple-600" />,
      format: (value: number) => `${value.toFixed(2)}%`,
      change: stats?.conversionRateChange || 0,
    },
    {
      title: "Active Links",
      value: stats?.activeLinks || 0,
      description: "Currently active",
      icon: <MousePointer className="h-5 w-5 text-indigo-600" />,
      format: (value: number) => value.toString(),
      change: null,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
            <div className="flex items-center">
              <div className="mr-2 rounded-md bg-gray-100 p-2">{stat.icon}</div>
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </div>
            {stat.change !== null && (
              <div
                className={`text-xs font-medium ${
                  stat.change > 0 ? "text-green-600" : stat.change < 0 ? "text-red-600" : "text-gray-600"
                }`}
              >
                {stat.change > 0 ? "+" : ""}
                {stat.change}%
              </div>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stat.format(stat.value)}</div>
            )}
            <CardDescription>{stat.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

