import type { User } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface DashboardHeaderProps {
  user: User | undefined | null
  isLoading: boolean
}

export default function DashboardHeader({ user, isLoading }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {isLoading ? <Skeleton className="inline-block h-8 w-32" /> : user?.name || "Member"}
        </h1>
        <p className="mt-1 text-gray-600">Here`s what`s new with your membership today</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-violet-600 p-0">
            3
          </Badge>
        </Button>

        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-violet-600 p-0">
            2
          </Badge>
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-purple-600">
            {!isLoading && user?.avatar && (
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" width={200} height={200} />
            )}
          </div>

          <div className="hidden md:block">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            ) : (
              <>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600">{user?.membershipTier} Member</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

