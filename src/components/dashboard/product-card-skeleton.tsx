import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />

      <CardContent className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="mb-1 h-5 w-16" />
        <Skeleton className="h-4 w-24" />
      </CardContent>

      <CardFooter className="border-t bg-gray-50 p-4">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
}

