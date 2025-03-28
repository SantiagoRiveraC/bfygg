"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { AffiliateLink } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Copy,
  Search,
  Link,
  ExternalLink,
  BarChart2,
  Share2,
  QrCode,
  Facebook,
  Twitter,
  Instagram,
  Send,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import QRCode from "react-qr-code"

interface GeneratedLinksProps {
  links: AffiliateLink[] | null | undefined
  isLoading: boolean
  onLinkCopied: () => void
  onLinkShared: (platform: string) => void
}

export default function GeneratedLinks({ links, isLoading, onLinkCopied, onLinkShared }: GeneratedLinksProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLink, setSelectedLink] = useState<AffiliateLink | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)

  const filteredLinks = links?.filter(
    (link) =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    onLinkCopied()
  }

  const handleShare = (platform: string) => {
    onLinkShared(platform)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="ml-2 h-10 w-24" />
          </div>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!links || links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Generated Links</CardTitle>
          <CardDescription>You haven`t generated any affiliate links yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <Link className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-gray-600">Generate your first affiliate link to start earning commissions</p>
            <Button
              className="mt-4 bg-violet-600 hover:bg-violet-700"
              onClick={() => {
                // This would navigate to the generate tab in a real app
                const generateTab = document.querySelector('[value="generate"]') as HTMLElement
                if (generateTab) generateTab.click()
              }}
            >
              Create Link
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Generated Links</CardTitle>
          <CardDescription>Manage and track all your affiliate links</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              className="ml-2 bg-violet-600 hover:bg-violet-700"
              onClick={() => {
                // This would navigate to the generate tab in a real app
                const generateTab = document.querySelector('[value="generate"]') as HTMLElement
                if (generateTab) generateTab.click()
              }}
            >
              New Link
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">Conversions</TableHead>
                  <TableHead className="text-right">Earnings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks?.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                          <Link className="h-4 w-4" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{link.name}</span>
                          <span className="max-w-[200px] truncate text-xs text-gray-500">{link.url}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(link.createdAt)}</TableCell>
                    <TableCell className="text-right">{link.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{link.conversions.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${link.earnings.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(link.url)} title="Copy link">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedLink(link)
                            setShowQRCode(true)
                          }}
                          title="Show QR code"
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" title="Share link">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleShare("Facebook")}>
                              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                              <span>Facebook</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare("Twitter")}>
                              <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                              <span>Twitter</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare("Instagram")}>
                              <Instagram className="mr-2 h-4 w-4 text-pink-600" />
                              <span>Instagram</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare("Email")}>
                              <Send className="mr-2 h-4 w-4 text-gray-600" />
                              <span>Email</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(link.url, "_blank")}
                          title="Open link"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            // This would navigate to a detailed analytics page in a real app
                            alert(`View analytics for ${link.name}`)
                          }}
                          title="View analytics"
                        >
                          <BarChart2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code for {selectedLink?.name}</DialogTitle>
            <DialogDescription>Scan this code to open your affiliate link</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            {selectedLink && (
              <>
                <QRCode value={selectedLink.url} size={200} />
                <p className="mt-4 break-all text-center text-sm text-gray-600">{selectedLink.url}</p>
                <Button
                  className="mt-4 bg-violet-600 hover:bg-violet-700"
                  onClick={() => {
                    // In a real app, this would download the QR code
                    alert("QR Code download would start here")
                  }}
                >
                  Download QR Code
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

