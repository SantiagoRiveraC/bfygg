"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAffiliateData } from "@/hooks/use-affiliate-data"
import StatsOverview from "@/components/affiliate/stats-overview"
import LinkGenerator from "@/components/affiliate/link-generator"
import PerformanceCharts from "@/components/affiliate/performance-charts"
import GeneratedLinks from "@/components/affiliate/generated-links"
import { toast, Toaster } from "react-hot-toast"
import type { AffiliateLink } from "@/types"

export default function AffiliateDashboardContent() {
  const { affiliateData, isLoading } = useAffiliateData()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLinkGenerated = (newLink: AffiliateLink) => {
    console.log(newLink)
    toast.success('link generate', { style: { textTransform: 'capitalize'}})
  }

  const handleLinkCopied = () => {
    toast.success('link copied', { style: { textTransform: 'capitalize'}})

  }

  const handleLinkShared = (platform: string) => {
    console.log(platform)
    toast.success('link shared', { style: { textTransform: 'capitalize'}})

  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="generate">Generate Links</TabsTrigger>
          <TabsTrigger value="links">My Links</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <StatsOverview stats={affiliateData?.stats} isLoading={isLoading} />
          <PerformanceCharts performanceData={affiliateData?.performanceData} isLoading={isLoading} className="mt-8" />
        </TabsContent>

        <TabsContent value="generate" className="mt-6">
          <LinkGenerator
            products={affiliateData?.products}
            isLoading={isLoading}
            onLinkGenerated={handleLinkGenerated}
            onLinkCopied={handleLinkCopied}
            onLinkShared={handleLinkShared}
          />
        </TabsContent>
        <TabsContent value="links" className="mt-6">
          <GeneratedLinks
            links={affiliateData?.generatedLinks}
            isLoading={isLoading}
            onLinkCopied={handleLinkCopied}
            onLinkShared={handleLinkShared}
          />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

