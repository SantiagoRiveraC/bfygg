import type { User } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  user: User | null | undefined
  isLoading: boolean
}

export default function DashboardHeader({ user, isLoading }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Affiliate Dashboard</h1>
        <p className="mt-1 text-gray-600">Manage your affiliate links and track your performance</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-violet-600 p-0">
            2
          </Badge>
        </Button>

        <Button variant="outline" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-purple-600">
            {!isLoading && user?.avatar && (
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
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
                <p className="text-xs text-gray-600">Affiliate Partner</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

