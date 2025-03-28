"use client"

import { useState } from "react"
import type { Product } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Gift, CreditCard, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

interface RedeemModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
  userPoints: number
  onConfirm: (usePoints: boolean) => void
}

export default function RedeemModal({ isOpen, onClose, product, userPoints, onConfirm }: RedeemModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"points" | "money">(
    userPoints >= Number(product.pointsPrice) ? "points" : "money",
  )
  const [confirmStep, setConfirmStep] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const hasEnoughPoints = userPoints >= Number(product.pointsPrice)

  const handleContinue = () => {
    if (paymentMethod === "points") {
      setConfirmStep(true)
    } else {
      handleConfirm()
    }
  }

  const handleConfirm = async () => {
    setIsProcessing(true)
    await onConfirm(paymentMethod === "points")
    setIsProcessing(false)
    resetModal()
  }

  const resetModal = () => {
    setConfirmStep(false)
    setPaymentMethod(hasEnoughPoints ? "points" : "money")
  }

  const handleClose = () => {
    onClose()
    resetModal()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!confirmStep ? (
          <>
            <DialogHeader>
              <DialogTitle>Redeem Product</DialogTitle>
              <DialogDescription>Choose how you would like to redeem this product.</DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4 py-4">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-medium">{product.title}</h4>
                <div className="mt-1 flex items-center gap-4">
                  <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-violet-600">{product.pointsPrice?.toLocaleString()} points</p>
                </div>
              </div>
            </div>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "points" | "money")}
              className="gap-4"
            >
              <div
                className={`flex items-start space-x-3 rounded-md border p-3 ${!hasEnoughPoints ? "opacity-50" : ""}`}
              >
                <RadioGroupItem value="points" id="points" disabled={!hasEnoughPoints} />
                <div className="flex flex-1 items-start justify-between">
                  <Label
                    htmlFor="points"
                    className={`flex cursor-pointer flex-col gap-1 ${!hasEnoughPoints ? "cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center">
                      <Gift className="mr-2 h-4 w-4 text-violet-600" />
                      <span>Pay with Points</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Use {product.pointsPrice?.toLocaleString()} points from your balance
                    </span>
                  </Label>
                  <span className="text-sm font-medium text-violet-600">{userPoints.toLocaleString()} available</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 rounded-md border p-3">
                <RadioGroupItem value="money" id="money" />
                <Label htmlFor="money" className="flex cursor-pointer flex-col gap-1">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4 text-gray-600" />
                    <span>Pay with Money</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Pay ${product.price.toFixed(2)} using your preferred payment method
                  </span>
                </Label>
              </div>
            </RadioGroup>

            {!hasEnoughPoints && (
              <Alert variant="destructive" className="bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not enough points</AlertTitle>
                <AlertDescription>
                  You need {product.pointsPrice?.toLocaleString()} points, but you only have{" "}
                  {userPoints.toLocaleString()} points.
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleContinue} className="bg-violet-600 hover:bg-violet-700">
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Redemption</DialogTitle>
              <DialogDescription>
                Please confirm that you want to redeem this product using your points.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Alert className="bg-violet-50 text-violet-800">
                <Gift className="h-4 w-4" />
                <AlertTitle>Points Redemption</AlertTitle>
                <AlertDescription>
                  You are about to use {product.pointsPrice?.toLocaleString()} points to redeem {product.title}. Your new
                  balance will be {(userPoints - Number(product.pointsPrice)).toLocaleString()} points.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setConfirmStep(false)} disabled={isProcessing}>
                Back
              </Button>
              <Button onClick={handleConfirm} className="bg-violet-600 hover:bg-violet-700" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm Redemption
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

