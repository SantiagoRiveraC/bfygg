"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useUsers } from "@/context/usersContext"
import { useId } from "@/context/captureIDContext"

export default function UserEditForm() {


	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [subscriptionStatus, setSubscriptionStatus] = useState(false)
	const { users } = useUsers()
	const { id } = useId()
	const userTest = users?.find( item => item._id === id)
	const [role, setRole] = useState(userTest?.role)
	const [membershipLevel, setMembershipLevel] = useState(userTest?.membershipLevel)

	console.log(id)
	// console.log(userTest)
	// Función de envío simulada
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		// Simulación de envío
		setTimeout(() => {
		setIsLoading(false)
		}, 1500)
	}

	useEffect(() => {
		if (userTest?.role && userTest?.membershipLevel) {
			setRole(userTest.role);
			setMembershipLevel(userTest.membershipLevel)
		}
	}, [userTest]);




	return (
		<div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 py-8 overflow-hidden">
		<div className="w-full max-w-4xl mx-auto">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
			<Card className="overflow-hidden border-violet-200 shadow-lg">
				<CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 py-5 text-white">
							<CardTitle className="text-center text-xl">Edit {userTest?.firstName} {userTest?.lastName}</CardTitle>
					<CardDescription className="text-center text-violet-100">Update user account information</CardDescription>
				</CardHeader>
				<CardContent className="p-5">
					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						{/* Left Column - Personal Information */}
						<div className="space-y-3">
							<h3 className="text-sm font-medium text-gray-700">Personal Information</h3>

							{/* First Name Field */}
							<div className="space-y-1.5">
							<Label htmlFor="firstName" className="text-sm font-medium">
								First Name
							</Label>
							<Input
								id="firstName"
								name="firstName"
								type="text"
								placeholder="First Name"
								className="border-violet-200 focus-visible:ring-violet-500 h-9"
								defaultValue={userTest?.firstName}
							/>
							</div>

							{/* Last Name Field */}
							<div className="space-y-1.5">
							<Label htmlFor="lastName" className="text-sm font-medium">
								Last Name
							</Label>
							<Input
								id="lastName"
								name="lastName"
								type="text"
								placeholder="Last Name"
								className="border-violet-200 focus-visible:ring-violet-500 h-9"
								defaultValue={userTest?.lastName}
							/>
							</div>

							{/* Email Field */}
							<div className="space-y-1.5">
							<Label htmlFor="email" className="text-sm font-medium">
								Email Address
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="email"
								className="border-violet-200 focus-visible:ring-violet-500 h-9"
								defaultValue={userTest?.email}
							/>
							</div>

							{/* Password Field */}
							<div className="space-y-1.5">
							<Label htmlFor="password" className="text-sm font-medium">
								Password
							</Label>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="password"
									className="border-violet-200 pr-10 focus-visible:ring-violet-500 h-9"
									defaultValue={userTest?.password}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
									aria-label={showPassword ? "Hide password" : "Show password"}
									>
									{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								</button>
							</div>
							</div>

							{/* Birthday Field */}
							<div className="space-y-1.5">
							<Label htmlFor="birthday" className="text-sm font-medium">
								Birthday
							</Label>
							<Input
								id="birthday"
								name="birthday"
								type="date"
								className="border-violet-200 focus-visible:ring-violet-500 h-9"
								defaultValue={userTest?.birthday}
							/>
							</div>
						</div>

						{/* Right Column - Account Information */}
						<div className="space-y-3">
							<h3 className="text-sm font-medium text-gray-700">Account Information</h3>

							{/* Role Field */}
							<div className="space-y-1.5">
							<Label htmlFor="role" className="text-sm font-medium">
								Role
							</Label>
								<Select value={role} onValueChange={setRole}>
									<SelectTrigger id="role" className="w-full border-violet-200 focus-visible:ring-violet-500 h-9">
										<SelectValue placeholder="Select role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="member">Member</SelectItem>
										<SelectItem value="affiliate">Affiliate</SelectItem>
										<SelectItem value="admin">Admin</SelectItem>
									</SelectContent>
							</Select>
							</div>

							{/* Membership Level Field */}
							<div className="space-y-1.5">
							<Label htmlFor="membershipLevel" className="text-sm font-medium">
								Membership Level
							</Label>
							<Select value={membershipLevel} onValueChange={setMembershipLevel}>
								<SelectTrigger
								id="membershipLevel"
								className="w-full border-violet-200 focus-visible:ring-violet-500 h-9"
								>
								<SelectValue placeholder="Select membership level" />
								</SelectTrigger>
								<SelectContent>
								<SelectItem value="basic">Basic</SelectItem>
								<SelectItem value="premium">Premium</SelectItem>
								<SelectItem value="vip">VIP</SelectItem>
								</SelectContent>
							</Select>
							</div>

							{/* Loyalty Points Field */}
							<div className="space-y-1.5">
							<Label htmlFor="loyaltyPoints" className="text-sm font-medium">
								Loyalty Points
							</Label>
							<Input
								id="loyaltyPoints"
								name="loyaltyPoints"
								type="number"
								placeholder="0"
								className="border-violet-200 focus-visible:ring-violet-500 h-9"
								defaultValue={userTest?.loyaltyPoints}
							/>
							</div>

							{/* Referral Code Field */}
							<div className="space-y-1.5">
							<Label htmlFor="referralCode" className="text-sm font-medium">
								Referral Code
							</Label>
							<Input
								id="referralCode"
								name="referralCode"
								type="text"
								placeholder="ABC123"
								className="border-violet-200 focus-visible:ring-violet-500 h-9"
								defaultValue={userTest?.referralCode}

							/>
							</div>

							{/* Subscription Expiration Field */}
							<div className="space-y-1.5">
							<Label htmlFor="subscriptionExpiration" className="text-sm font-medium">
								Subscription Expiration
							</Label>
							<Input
								id="subscriptionExpiration"
								name="subscriptionExpiration"
								type="date"
								className="border-violet-200 focus-visible:ring-violet-500 h-9"
							/>
							</div>

							{/* Subscription Status Field */}
							<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="subscriptionStatus" className="text-sm font-medium">
								Subscription Status
								</Label>
								<Switch
									id="subscriptionStatus"
									defaultChecked={userTest?.subscriptionStatus ? true : false}
									onCheckedChange={setSubscriptionStatus}
									className="data-[state=checked]:bg-violet-600 cursor-pointer"
								/>
							</div>
							<p className="text-xs text-gray-500">{subscriptionStatus ? "Active" : "Inactive"}</p>
							</div>
						</div>
						</div>

						{/* Submit Button - Full Width */}
						<div className="mt-5">
						<Button
							type="submit"
							disabled={isLoading}
							className={cn(
							"w-full bg-violet-600 text-white hover:bg-violet-700 h-9",
							"transition-all duration-200 ease-in-out",
							"focus:ring-violet-500",
							)}
						>
							{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Updating user...
							</>
							) : (
							"Save Changes"
							)}
						</Button>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center border-t bg-gray-50 py-3">
				<p className="text-sm text-gray-600">All fields marked with * are required</p>
				</CardFooter>
			</Card>
			</motion.div>
		</div>
		</div>
	)
}

