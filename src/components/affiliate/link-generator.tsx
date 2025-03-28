"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { Product, AffiliateLink } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy, QrCode, Link, Facebook, Twitter, Instagram, Send, Clipboard, Code, MessageSquare } from "lucide-react"
import QRCode from "react-qr-code"
import { v4 as uuidv4 } from "uuid"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface LinkGeneratorProps {
  products: Product[] | null | undefined
  isLoading: boolean
  onLinkGenerated: (link: AffiliateLink) => void
  onLinkCopied: () => void
  onLinkShared: (platform: string) => void
}

export default function LinkGenerator({
  products,
  isLoading,
  onLinkGenerated,
  onLinkCopied,
  onLinkShared,
}: LinkGeneratorProps) {
  const [linkType, setLinkType] = useState<"product" | "category" | "custom">("product")
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("membership")
  const [customUrl, setCustomUrl] = useState<string>("")
  const [campaignName, setCampaignName] = useState<string>("")
  const [includeUtm, setIncludeUtm] = useState<boolean>(true)
  const [generatedLink, setGeneratedLink] = useState<string>("")
  const [generatedQR, setGeneratedQR] = useState<boolean>(false)

  // Pre-written marketing messages
  const marketingMessages = {
    facebook:
      "🔥 Exclusive offer for my friends! Join Before You GoGo and earn amazing rewards. Use my link to get started and we both benefit! #BeforeYouGoGo #Rewards",
    twitter:
      "I've been loving the rewards from @BeforeYouGoGo! Join through my affiliate link and start earning points today! #RewardsProgram",
    instagram:
      "Swipe up to join @beforeyougogo_official and start earning amazing rewards! I've already redeemed mine for some awesome products. Use my link in bio! ✨ #BeforeYouGoGo #AffiliatePartner",
    email: `Hi there,

I wanted to share this amazing rewards program with you called "Before You GoGo". I've been a member for a while and have already earned enough points for some great rewards.

Join using my link below and you'll get a special bonus:
{{LINK}}

Let me know if you have any questions!

Best regards,
{{NAME}}`,
  }

  // Categories for the dropdown
  const categories = [
    { id: "membership", name: "Membership Plans" },
    { id: "rewards", name: "Rewards Program" },
    { id: "products", name: "All Products" },
    { id: "experiences", name: "Experiences" },
    { id: "subscriptions", name: "Subscriptions" },
  ]

  const generateLink = () => {
    let baseUrl = "https://beforeyougogo.com/ref/"
    const params = new URLSearchParams()

    // Add affiliate ID
    params.append("aid", "AF123456")

    // Add source based on link type
    if (linkType === "product" && selectedProduct) {
      baseUrl += `product/${selectedProduct}`
    } else if (linkType === "category" && selectedCategory) {
      baseUrl += `category/${selectedCategory}`
    } else if (linkType === "custom" && customUrl) {
      baseUrl += customUrl.startsWith("/") ? customUrl.substring(1) : customUrl
    } else {
      baseUrl += ""
    }

    // Add UTM parameters if enabled
    if (includeUtm) {
      params.append("utm_source", "affiliate")
      params.append("utm_medium", "referral")
      if (campaignName) {
        params.append("utm_campaign", campaignName)
      }
    }

    const finalUrl = `${baseUrl}?${params.toString()}`
    setGeneratedLink(finalUrl)
    setGeneratedQR(true)

    // Create a new link object
    const newLink: AffiliateLink = {
      id: uuidv4(),
      url: finalUrl,
      type: linkType,
      name: getLinkName(),
      createdAt: new Date().toISOString(),
      clicks: 0,
      conversions: 0,
      earnings: 0,
    }

    // Call the callback to add the link
    onLinkGenerated(newLink)
  }

  const getLinkName = (): string => {
    if (linkType === "product" && selectedProduct) {
      const product = products?.find((p) => p.id === selectedProduct)
      return product ? `${product.title} Link` : "Product Link"
    } else if (linkType === "category") {
      const category = categories.find((c) => c.id === selectedCategory)
      return category ? `${category.name} Link` : "Category Link"
    } else if (linkType === "custom") {
      return customUrl ? `Custom: ${customUrl}` : "Custom Link"
    }
    return "Affiliate Link"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    onLinkCopied()
  }

  const shareLink = (platform: string) => {
    // In a real app, this would open the sharing dialog for each platform
    onLinkShared(platform)
  }

  const getEmbedCode = (): string => {
    return `<a href="${generatedLink}" target="_blank" rel="noopener noreferrer" class="bygogo-affiliate">
  Join Before You GoGo Rewards
</a>
<script src="https://beforeyougogo.com/js/affiliate.js" data-aid="AF123456"></script>`
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Generate Affiliate Link</CardTitle>
          <CardDescription>Create custom affiliate links for products, categories, or any page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="product" onValueChange={(value) => setLinkType(value as "product" | "category" | "custom")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="category">Category</TabsTrigger>
              <TabsTrigger value="custom">Custom URL</TabsTrigger>
            </TabsList>

            <TabsContent value="product" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Select Product</Label>
                {isLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </TabsContent>

            <TabsContent value="category" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Select Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-url">Custom URL Path</Label>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">beforeyougogo.com/</span>
                  <Input
                    id="custom-url"
                    placeholder="e.g., special-offer"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign Name (Optional)</Label>
              <Input
                id="campaign"
                placeholder="Summer2023, BlackFriday, etc."
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="utm" checked={includeUtm} onCheckedChange={setIncludeUtm} />
              <Label htmlFor="utm">Include UTM parameters for tracking</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateLink}
            className="w-full bg-violet-600 hover:bg-violet-700"
            disabled={
              (linkType === "product" && !selectedProduct) ||
              (linkType === "category" && !selectedCategory) ||
              (linkType === "custom" && !customUrl)
            }
          >
            <Link className="mr-2 h-4 w-4" />
            Generate Affiliate Link
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        {generatedLink && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Your Affiliate Link</CardTitle>
                <CardDescription>Share this link to earn commissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 overflow-hidden rounded-md border bg-gray-50 p-2">
                  <p className="break-all text-sm">{generatedLink}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => copyToClipboard(generatedLink)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => shareLink("WhatsApp")}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {generatedQR && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="mr-2 h-5 w-5" />
                    QR Code
                  </CardTitle>
                  <CardDescription>Scan to open your affiliate link</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="p-4">
                    <QRCode value={generatedLink} size={150} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      // In a real app, this would download the QR code
                      alert("QR Code download would start here")
                    }}
                  >
                    Download QR Code
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Share Your Link</CardTitle>
                <CardDescription>Promote your link across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-3"
                    onClick={() => shareLink("Facebook")}
                  >
                    <Facebook className="mb-1 h-5 w-5 text-blue-600" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-3"
                    onClick={() => shareLink("Twitter")}
                  >
                    <Twitter className="mb-1 h-5 w-5 text-blue-400" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-3"
                    onClick={() => shareLink("Instagram")}
                  >
                    <Instagram className="mb-1 h-5 w-5 text-pink-600" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-3"
                    onClick={() => shareLink("Email")}
                  >
                    <Send className="mb-1 h-5 w-5 text-gray-600" />
                    <span className="text-xs">Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-3"
                    onClick={() => copyToClipboard(generatedLink)}
                  >
                    <Clipboard className="mb-1 h-5 w-5 text-violet-600" />
                    <span className="text-xs">Copy</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex flex-col items-center p-3"
                    onClick={() => copyToClipboard(getEmbedCode())}
                  >
                    <Code className="mb-1 h-5 w-5 text-green-600" />
                    <span className="text-xs">Embed</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Marketing Messages
                </CardTitle>
                <CardDescription>Ready-to-use captions for your promotions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="facebook">
                    <AccordionTrigger className="text-sm font-medium">Facebook Post</AccordionTrigger>
                    <AccordionContent>
                      <Textarea className="min-h-[100px]" value={marketingMessages.facebook} readOnly />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(marketingMessages.facebook)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Text
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="twitter">
                    <AccordionTrigger className="text-sm font-medium">Twitter Post</AccordionTrigger>
                    <AccordionContent>
                      <Textarea className="min-h-[100px]" value={marketingMessages.twitter} readOnly />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(marketingMessages.twitter)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Text
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="instagram">
                    <AccordionTrigger className="text-sm font-medium">Instagram Caption</AccordionTrigger>
                    <AccordionContent>
                      <Textarea className="min-h-[100px]" value={marketingMessages.instagram} readOnly />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(marketingMessages.instagram)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Text
                      </Button>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="email">
                    <AccordionTrigger className="text-sm font-medium">Email Template</AccordionTrigger>
                    <AccordionContent>
                      <Textarea className="min-h-[200px]" value={marketingMessages.email} readOnly />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => copyToClipboard(marketingMessages.email)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Text
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

