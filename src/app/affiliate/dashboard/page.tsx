import { Suspense } from "react"
import AffiliateDashboardContent from "@/components/affiliate/affiliate-dashboard-content"
import AffiliateDashboardSkeleton from "@/components/affiliate/affiliate-dashboard-skeleton"

export default function AffiliateDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<AffiliateDashboardSkeleton />}>
        <AffiliateDashboardContent />
      </Suspense>
    </div>
  )
}
