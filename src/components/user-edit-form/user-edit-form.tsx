"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { User, UserEditFormData } from "@/utils/interfaces"
import { Toaster } from "react-hot-toast"

type EditFormProps = {
	user?: User
	handleSubmit: (formdata: UserEditFormData) => void
}

export default function UserEditForm({ user, handleSubmit }: EditFormProps) {

	const [formdata, setFormData] = useState<UserEditFormData>({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		birthday: user?.birthday || '',
		password: '',
		role: user?.role || 'member',
		membershipLevel: user?.membership?.level || 'basic',
		loyaltyPoints: user?.membership?.loyaltyPoints || 0,
		referralCode: user?.affiliate?.referralCode || '',
		subscriptionExpiration: user?.membership?.subscriptionExpiration
			? new Date(user.membership.subscriptionExpiration).toISOString().split('T')[0]
			: '',
		subscriptionStatus: user?.membership?.status || false,
	})

	const [originalPassword] = useState(user?.password || '')
	const [showPassword, setShowPassword] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target
		const checked = (e.target as HTMLInputElement).checked

		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}))
	}

	const handleSelectChange = <T extends keyof UserEditFormData>(
		field: T,
		value: UserEditFormData[T]
	) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const dataToSubmit = {
			...formdata,
			password: formdata.password || originalPassword
		}

		handleSubmit(dataToSubmit)
	}

	return (
		<div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 py-8 overflow-hidden">
			<div className="w-full max-w-4xl mx-auto">
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					<Card className="overflow-hidden border-violet-200 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 py-5 text-white">
							<CardTitle className="text-center text-xl">Edit {user?.firstName} {user?.lastName}</CardTitle>
							<CardDescription className="text-center text-violet-100">Update user account information</CardDescription>
						</CardHeader>
						<CardContent className="p-5">
							<form onSubmit={handleFormSubmit}>
								<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
									{/* Left Column - Personal Information */}
									<div className="space-y-3">
										<h3 className="text-sm font-medium text-gray-700">Personal Information</h3>

										{/* First Name Field */}
										<div className="space-y-1.5">
											<Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
											<Input
												id="firstName"
												name="firstName"
												type="text"
												placeholder="First Name"
												className="border-violet-200 focus-visible:ring-violet-500 h-9"
												value={formdata.firstName}
												onChange={handleInputChange}
												required
											/>
										</div>

										{/* Last Name Field */}
										<div className="space-y-1.5">
											<Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
											<Input
												id="lastName"
												name="lastName"
												type="text"
												placeholder="Last Name"
												className="border-violet-200 focus-visible:ring-violet-500 h-9"
												value={formdata.lastName}
												onChange={handleInputChange}
												required
											/>
										</div>

										{/* Email Field */}
										<div className="space-y-1.5">
											<Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
											<Input
												id="email"
												name="email"
												type="email"
												placeholder="email"
												className="border-violet-200 focus-visible:ring-violet-500 h-9"
												value={formdata.email}
												onChange={handleInputChange}
												required
											/>
										</div>

										{/* Password Field */}
										<div className="space-y-1.5">
											<Label htmlFor="password" className="text-sm font-medium">Password (leave blank to keep current)</Label>
											<div className="relative">
												<Input
													id="password"
													name="password"
													type={showPassword ? "text" : "password"}
													placeholder="New password"
													className="border-violet-200 pr-10 focus-visible:ring-violet-500 h-9"
													value={formdata.password || ''}
													onChange={handleInputChange}
												/>
												<button
													type="button"
													onClick={() => setShowPassword(!showPassword)}
													className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
													aria-label={showPassword ? "Hide password" : "Show password"}
												>
													{showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
												</button>
											</div>
										</div>

										{/* Birthday Field */}
										<div className="space-y-1.5">
											<Label htmlFor="birthday" className="text-sm font-medium">Birthday</Label>
											<Input
												id="birthday"
												name="birthday"
												type="date"
												className="border-violet-200 focus-visible:ring-violet-500 h-9"
												value={formdata.birthday}
												onChange={handleInputChange}
											/>
										</div>
									</div>

									{/* Right Column - Account Information */}
									<div className="space-y-3">
										<h3 className="text-sm font-medium text-gray-700">Account Information</h3>

										{/* Role Field */}
										<div className="space-y-1.5">
											<Label htmlFor="role" className="text-sm font-medium">Role</Label>
											<Select
												value={formdata.role}
												onValueChange={(value) => handleSelectChange('role', value as 'member' | 'affiliate' | 'admin')}
											>
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
											<Label htmlFor="membershipLevel" className="text-sm font-medium">Membership Level</Label>
											<Select
												value={formdata.membershipLevel}
												onValueChange={(value) => handleSelectChange('membershipLevel', value as 'basic' | 'premium' | 'vip')}
											>
												<SelectTrigger id="membershipLevel" className="w-full border-violet-200 focus-visible:ring-violet-500 h-9">
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
											<Label htmlFor="loyaltyPoints" className="text-sm font-medium">Loyalty Points</Label>
											<Input
												id="loyaltyPoints"
												name="loyaltyPoints"
												type="number"
												min="0"
												placeholder="0"
												className="border-violet-200 focus-visible:ring-violet-500 h-9"
												value={formdata.loyaltyPoints}
												onChange={handleInputChange}
											/>
										</div>

										{/* Referral Code Field */}
										<div className="space-y-1.5">
											<Label htmlFor="referralCode" className="text-sm font-medium">Referral Code</Label>
											<Input
												id="referralCode"
												name="referralCode"
												type="text"
												placeholder="ABC123"
												className="border-violet-200 focus-visible:ring-violet-500 h-9"
												value={formdata.referralCode}
												onChange={handleInputChange}
											/>
										</div>

										{/* Subscription Expiration Field */}
										<div className="space-y-1.5">
											<Label htmlFor="subscriptionExpiration" className="text-sm font-medium">Subscription Expiration</Label>
											<Input
												id="subscriptionExpiration"
												name="subscriptionExpiration"
												type="date"
												className="border-violet-200 focus-visible:ring-violet-500 h-9"
												value={formdata.subscriptionExpiration}
												onChange={handleInputChange}
											/>
										</div>

										{/* Subscription Status Field */}
										<div className="space-y-1.5">
											<div className="flex items-center justify-between">
												<Label htmlFor="subscriptionStatus" className="text-sm font-medium">Subscription Status</Label>
												<Switch
													id="subscriptionStatus"
													checked={formdata.subscriptionStatus}
													onCheckedChange={(checked) => handleSelectChange('subscriptionStatus', checked)}
													className="data-[state=checked]:bg-violet-600 cursor-pointer"
												/>
											</div>
											<p className="text-xs text-gray-500">
												{formdata.subscriptionStatus ? "Active" : "Inactive"}
											</p>
										</div>
									</div>
								</div>

								{/* Submit Button - Full Width */}
								<div className="mt-5">
									<Button
										type="submit"
										className={cn(
											"w-full bg-violet-600 text-white hover:bg-violet-700 h-9",
											"transition-all duration-200 ease-in-out",
											"focus:ring-violet-500",
											'cursor-pointer'
										)}
									>
										Save Changes
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
			<Toaster />
		</div>
	)
}