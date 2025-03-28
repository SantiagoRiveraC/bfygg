"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { PerformanceData } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

interface PerformanceChartsProps {
  performanceData: PerformanceData | null | undefined
  isLoading: boolean
  showDetailed?: boolean
  className?: string
}

export default function PerformanceCharts({
  isLoading,
  className = "",
}: PerformanceChartsProps) {

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

}

