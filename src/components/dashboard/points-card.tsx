import type { User } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, Gift, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PointsCardProps {
  user: User | undefined | null
  isLoading: boolean
}

export default function PointsCard({ user, isLoading }: PointsCardProps) {
  return (
    <Card className="overflow-hidden border-violet-200">
      <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 pb-6 pt-6 text-white">
        <CardTitle className="flex items-center justify-between">
          <span>Your Rewards</span>
          <Award className="h-6 w-6" />
        </CardTitle>
        <CardDescription className="text-violet-100">{user?.membershipTier || "Premium"} Membership</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-gray-600">Available Points</p>
          {isLoading ? (
            <Skeleton className="mx-auto mt-2 h-12 w-32" />
          ) : (
            <h3 className="mt-1 text-4xl font-bold text-violet-600">{user?.loyaltyPoints?.toLocaleString() || 0}</h3>
          )}
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Progress to next tier</span>
            <span className="font-medium">
              {isLoading ? <Skeleton className="h-4 w-10 rounded" /> : `${user?.tierProgress || 0}%`}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-violet-600 transition-all duration-500"
              style={{ width: `${isLoading ? 0 : user?.tierProgress || 0}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-violet-100 p-2">
                <Gift className="h-4 w-4 text-violet-600" />
              </div>
              <span className="text-sm">Next Reward</span>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {isLoading ? <Skeleton className="h-4 w-20" /> : `${user?.nextRewardPoints || 500} points`}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-violet-100 p-2">
                <TrendingUp className="h-4 w-4 text-violet-600" />
              </div>
              <span className="text-sm">Points Earned This Month</span>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {isLoading ? <Skeleton className="h-4 w-20" /> : `${user?.monthlyPoints || 120} points`}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t bg-gray-50 p-4">
        <Link href="/rewards" className="text-sm font-medium text-violet-600 hover:text-violet-800">
          View all rewards
        </Link>
        <Link href="/rewards" className="text-sm font-medium text-violet-600 hover:text-violet-800">
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

