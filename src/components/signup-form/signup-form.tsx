/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { motion, LayoutGroup } from "framer-motion"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { User } from "@/utils/interfaces"

type SignupFormProps = {
	formData: User
	setFormData: React.Dispatch<React.SetStateAction<User>>
	handleSubmit: (e: React.FormEvent) => void
}

export default function SignupForm({ formData, setFormData, handleSubmit }: SignupFormProps) {
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		birthday: "",
		companyName: "",
		contactName: "",
		phone: "",
		address: "",
		affiliateType: "",
	})

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const [passwordStrength, setPasswordStrength] = useState({
		hasMinLength: false,
		hasUpperCase: false,
		hasLowerCase: false,
		hasNumber: false,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		if (name.startsWith('affiliate.')) {
			const fieldName = name.split('.')[1]
			setFormData(prev => {
				const currentAffiliate = prev.affiliate || {
					status: 'pending',
					commissionRate: 0.1
				}

				return {
					...prev,
					affiliate: {
						...currentAffiliate,
						[fieldName]: value,
						status: currentAffiliate.status
					}
				}
			})
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value
			}))
		}
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => {
			const currentAffiliate = prev.affiliate || {
				status: 'pending',
				commissionRate: 0.1
			}

			return {
				...prev,
				affiliate: {
					...currentAffiliate,
					[name]: value,
					status: currentAffiliate.status
				}
			}
		})
	}

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	useEffect(() => {
		const { password } = formData

		setPasswordStrength({
			hasMinLength: password.length >= 8,
			hasUpperCase: /[A-Z]/.test(password),
			hasLowerCase: /[a-z]/.test(password),
			hasNumber: /[0-9]/.test(password),
		})
	}, [formData.password])

	useEffect(() => {
		const newErrors = { ...errors }

		if (formData.firstName.trim() && formData.firstName.length < 2) {
			newErrors.firstName = "First name must be at least 2 characters"
		} else {
			newErrors.firstName = ""
		}

		if (formData.lastName.trim() && formData.lastName.length < 2) {
			newErrors.lastName = "Last name must be at least 2 characters"
		} else {
			newErrors.lastName = ""
		}

		if (formData.email.trim() && !validateEmail(formData.email)) {
			newErrors.email = "Please enter a valid email address"
		} else {
			newErrors.email = ""
		}

		if (formData.password.trim()) {
			const strengthScore = Object.values(passwordStrength).filter(Boolean).length
			if (strengthScore < 2) {
				newErrors.password = "Password is too weak"
			} else {
				newErrors.password = ""
			}
		} else {
			newErrors.password = ""
		}

		if (formData.confirmPassword?.trim() && formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match"
		} else {
			newErrors.confirmPassword = ""
		}

		if (formData.birthday) {
			const birthDate = new Date(formData.birthday)
			const today = new Date()
			const age = today.getFullYear() - birthDate.getFullYear()

			if (age < 13) {
				newErrors.birthday = "You must be at least 13 years old"
			} else {
				newErrors.birthday = ""
			}
		} else {
			newErrors.birthday = ""
		}

		if (formData.role === "affiliate") {
			if (formData.affiliate?.companyName?.trim() && formData.affiliate.companyName.length < 2) {
				newErrors.companyName = "Company name must be at least 2 characters"
			} else {
				newErrors.companyName = ""
			}

			if (formData.affiliate?.contactName?.trim() && formData.affiliate.contactName.length < 2) {
				newErrors.contactName = "Contact name must be at least 2 characters"
			} else {
				newErrors.contactName = ""
			}

			if (formData.affiliate?.phone?.trim() && !/^\+?[0-9\s\-()]{8,}$/.test(formData.affiliate.phone)) {
				newErrors.phone = "Please enter a valid phone number"
			} else {
				newErrors.phone = ""
			}

			if (formData.affiliate?.address?.trim() && formData.affiliate.address.length < 5) {
				newErrors.address = "Address must be at least 5 characters"
			} else {
				newErrors.address = ""
			}

			if (!formData.affiliate?.affiliateType) {
				newErrors.affiliateType = "Please select an affiliate type"
			} else {
				newErrors.affiliateType = ""
			}
		}

		setErrors(newErrors)
	}, [formData, passwordStrength])

	const getPasswordStrength = () => {
		if (!formData.password) return { percent: 0, color: "" }

		const strengthScore = Object.values(passwordStrength).filter(Boolean).length
		const totalChecks = Object.keys(passwordStrength).length
		const percent = (strengthScore / totalChecks) * 100

		let color = ""
		if (percent <= 25) color = "bg-red-500"
		else if (percent <= 50) color = "bg-orange-500"
		else if (percent <= 75) color = "bg-yellow-500"
		else color = "bg-green-500"

		return { percent, color }
	}

	const containerVariants = {
		member: {
			width: "100%",
			maxWidth: "28rem",
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 25,
				duration: 0.8,
			},
		},
		affiliate: {
			width: "100%",
			maxWidth: "64rem",
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 25,
				duration: 0.8,
			},
		},
	}

	const affiliateColumnVariants = {
		hidden: {
			opacity: 0,
			x: 50,
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 25,
				duration: 0.8,
			},
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 25,
				duration: 0.8,
			},
		},
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gray-50 px-4">
			<LayoutGroup>
				<motion.div
					className="w-full mx-auto"
					variants={containerVariants}
					initial="member"
					animate={formData.role === "affiliate" ? "affiliate" : "member"}
				>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						layout="position"
					>
						<Card className="border-violet-200 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 py-3 text-white">
								<CardTitle className="text-center text-xl">Create Account</CardTitle>
								<CardDescription className="text-center text-violet-100">
									Sign up to get started
								</CardDescription>
							</CardHeader>
							<CardContent className="p-4">
								<form onSubmit={handleSubmit}>
									{/* User Type Selection */}
									<motion.div className="space-y-1 mb-3" layout="position">
										<Label htmlFor="role" className="text-sm font-medium">
											Register as
										</Label>
										<div className="flex space-x-4">
											<div className="flex items-center">
												<input
													type="radio"
													id="member"
													name="role"
													value="member"
													checked={formData.role === "member"}
													onChange={() => setFormData(prev => ({ ...prev, role: "member" }))}
													className="h-4 w-4 text-violet-600 focus:ring-violet-500"
												/>
												<Label htmlFor="member" className="ml-2 text-sm">
													Member
												</Label>
											</div>
											<div className="flex items-center">
												<input
													type="radio"
													id="affiliate"
													name="role"
													value="affiliate"
													checked={formData.role === "affiliate"}
													onChange={() => setFormData(prev => ({ ...prev, role: "affiliate" }))}
													className="h-4 w-4 text-violet-600 focus:ring-violet-500"
												/>
												<Label htmlFor="affiliate" className="ml-2 text-sm">
													Affiliate
												</Label>
											</div>
										</div>
									</motion.div>

									{/* Two-column layout */}
									<motion.div
										className="grid gap-6"
										style={{
											gridTemplateColumns: formData.role === "affiliate" ? "repeat(2, 1fr)" : "1fr",
										}}
										layout="position"
									>
										{/* Left column - Basic Information */}
										<motion.div className="space-y-2" layout="position">
											<h3 className="text-sm font-medium text-gray-700">Personal Information</h3>

											{/* First Name Field */}
											<div className="space-y-1">
												<Label htmlFor="firstName" className="text-xs font-medium">
													First Name
												</Label>
												<Input
													id="firstName"
													name="firstName"
													type="text"
													placeholder="First Name"
													className={cn(
														"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
														errors.firstName && "border-red-300 focus-visible:ring-red-500",
													)}
													value={formData.firstName}
													onChange={handleChange}
												/>
												{errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
											</div>

											{/* Last Name Field */}
											<div className="space-y-1">
												<Label htmlFor="lastName" className="text-xs font-medium">
													Last Name
												</Label>
												<Input
													id="lastName"
													name="lastName"
													type="text"
													placeholder="Last Name"
													className={cn(
														"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
														errors.lastName && "border-red-300 focus-visible:ring-red-500",
													)}
													value={formData.lastName}
													onChange={handleChange}
												/>
												{errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
											</div>

											{/* Email Field */}
											<div className="space-y-1">
												<Label htmlFor="email" className="text-xs font-medium">
													Email Address
												</Label>
												<Input
													id="email"
													name="email"
													type="email"
													placeholder="email@example.com"
													className={cn(
														"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
														errors.email && "border-red-300 focus-visible:ring-red-500",
													)}
													value={formData.email}
													onChange={handleChange}
												/>
												{errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
											</div>

											{/* Password Field */}
											<div className="space-y-1">
												<Label htmlFor="password" className="text-xs font-medium">
													Password
												</Label>
												<div className="relative">
													<Input
														id="password"
														name="password"
														type={showPassword ? "text" : "password"}
														placeholder="Password"
														className={cn(
															"border-violet-200 pr-10 focus-visible:ring-violet-500 h-8 text-sm",
															errors.password && "border-red-300 focus-visible:ring-red-500",
														)}
														value={formData.password}
														onChange={handleChange}
													/>
													<button
														type="button"
														onClick={() => setShowPassword(!showPassword)}
														className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
														aria-label={showPassword ? "Hide password" : "Show password"}
													>
														{showPassword ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
													</button>
												</div>
												{errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

												{/* Password strength indicators */}
												{formData.password && (
													<div className="mt-1 space-y-1">
														<div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
															<div
																className={`h-full ${getPasswordStrength().color} transition-all duration-300 ease-in-out`}
																style={{ width: `${getPasswordStrength().percent}%` }}
															/>
														</div>

														<div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
															<div className="flex items-center gap-1">
																{passwordStrength.hasMinLength ? (
																	<Check className="h-2.5 w-2.5 text-green-500" />
																) : (
																	<X className="h-2.5 w-2.5 text-red-500" />
																)}
																<span className="text-xs">8+ characters</span>
															</div>
															<div className="flex items-center gap-1">
																{passwordStrength.hasUpperCase ? (
																	<Check className="h-2.5 w-2.5 text-green-500" />
																) : (
																	<X className="h-2.5 w-2.5 text-red-500" />
																)}
																<span className="text-xs">Uppercase</span>
															</div>
															<div className="flex items-center gap-1">
																{passwordStrength.hasLowerCase ? (
																	<Check className="h-2.5 w-2.5 text-green-500" />
																) : (
																	<X className="h-2.5 w-2.5 text-red-500" />
																)}
																<span className="text-xs">Lowercase</span>
															</div>
															<div className="flex items-center gap-1">
																{passwordStrength.hasNumber ? (
																	<Check className="h-2.5 w-2.5 text-green-500" />
																) : (
																	<X className="h-2.5 w-2.5 text-red-500" />
																)}
																<span className="text-xs">Number</span>
															</div>
														</div>
													</div>
												)}
											</div>

											{/* Confirm Password Field */}
											<div className="space-y-1">
												<Label htmlFor="confirmPassword" className="text-xs font-medium">
													Confirm Password
												</Label>
												<div className="relative">
													<Input
														id="confirmPassword"
														name="confirmPassword"
														type={showConfirmPassword ? "text" : "password"}
														placeholder="Confirm Password"
														className={cn(
															"border-violet-200 pr-10 focus-visible:ring-violet-500 h-8 text-sm",
															errors.confirmPassword && "border-red-300 focus-visible:ring-red-500",
														)}
														value={formData.confirmPassword || ''}
														onChange={handleChange}
													/>
													<button
														type="button"
														onClick={() => setShowConfirmPassword(!showConfirmPassword)}
														className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
														aria-label={showConfirmPassword ? "Hide password" : "Show password"}
													>
														{showConfirmPassword ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
													</button>
												</div>
												{errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
												{formData.confirmPassword && formData.password === formData.confirmPassword && (
													<p className="text-xs text-green-500 flex items-center gap-1">
														<Check className="h-2.5 w-2.5" /> Passwords match
													</p>
												)}
											</div>

											{/* Birthday Field */}
											<div className="space-y-1">
												<Label htmlFor="birthday" className="text-xs font-medium">
													Birthday
												</Label>
												<Input
													id="birthday"
													name="birthday"
													type="date"
													className={cn(
														"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
														errors.birthday && "border-red-300 focus-visible:ring-red-500",
													)}
													value={formData.birthday}
													onChange={handleChange}
												/>
												{errors.birthday && <p className="text-xs text-red-500">{errors.birthday}</p>}
											</div>
										</motion.div>

										{/* Right column - Affiliate Information */}
										{formData.role === "affiliate" && (
											<motion.div
												className="space-y-2"
												variants={affiliateColumnVariants}
												initial="hidden"
												animate="visible"
												exit="hidden"
												key="affiliate-column"
												layout="position"
											>
												<h3 className="text-sm font-medium text-gray-700">Affiliate Information</h3>

												{/* Company Name Field */}
												<div className="space-y-1">
													<Label htmlFor="affiliate.companyName" className="text-xs font-medium">
														Company/Entity Name
													</Label>
													<Input
														id="affiliate.companyName"
														name="affiliate.companyName"
														type="text"
														placeholder="Company Name"
														className={cn(
															"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
															errors.companyName && "border-red-300 focus-visible:ring-red-500",
														)}
														value={formData.affiliate?.companyName || ''}
														onChange={handleChange}
													/>
													{errors.companyName && <p className="text-xs text-red-500">{errors.companyName}</p>}
												</div>

												{/* Contact Name Field */}
												<div className="space-y-1">
													<Label htmlFor="affiliate.contactName" className="text-xs font-medium">
														Primary Contact Name
													</Label>
													<Input
														id="affiliate.contactName"
														name="affiliate.contactName"
														type="text"
														placeholder="Contact Name"
														className={cn(
															"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
															errors.contactName && "border-red-300 focus-visible:ring-red-500",
														)}
														value={formData.affiliate?.contactName || ''}
														onChange={handleChange}
													/>
													{errors.contactName && <p className="text-xs text-red-500">{errors.contactName}</p>}
												</div>

												{/* Phone Field */}
												<div className="space-y-1">
													<Label htmlFor="affiliate.phone" className="text-xs font-medium">
														Phone Number
													</Label>
													<Input
														id="affiliate.phone"
														name="affiliate.phone"
														type="tel"
														placeholder="Phone Number"
														className={cn(
															"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
															errors.phone && "border-red-300 focus-visible:ring-red-500",
														)}
														value={formData.affiliate?.phone || ''}
														onChange={handleChange}
													/>
													{errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
												</div>

												{/* Address Field */}
												<div className="space-y-1">
													<Label htmlFor="affiliate.address" className="text-xs font-medium">
														Address
													</Label>
													<Input
														id="affiliate.address"
														name="affiliate.address"
														type="text"
														placeholder="Address"
														className={cn(
															"border-violet-200 focus-visible:ring-violet-500 h-8 text-sm",
															errors.address && "border-red-300 focus-visible:ring-red-500",
														)}
														value={formData.affiliate?.address || ''}
														onChange={handleChange}
													/>
													{errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
												</div>

												{/* Affiliate Type Field */}
												<div className="space-y-1">
													<Label htmlFor="affiliateType" className="text-xs font-medium">
														Affiliate Type
													</Label>
													<select
														id="affiliateType"
														name="affiliateType"
														className={cn(
															"w-full rounded-md border border-violet-200 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 h-8",
															errors.affiliateType && "border-red-300 focus:ring-red-500",
														)}
														value={formData.affiliate?.affiliateType || ''}
														onChange={handleSelectChange}
													>
														<option value="">Select affiliate type</option>
														<option value="hotel">Hotel</option>
														<option value="agency">Travel Agency</option>
														<option value="operator">Tour Operator</option>
														<option value="restaurant">Restaurant</option>
														<option value="other">Other</option>
													</select>
													{errors.affiliateType && <p className="text-xs text-red-500">{errors.affiliateType}</p>}
												</div>

												{/* Document Upload Field */}
												<div className="space-y-1">
													<Label htmlFor="document" className="text-xs font-medium">
														Documentation
													</Label>
													<Input
														id="document"
														name="document"
														type="file"
														className="border-violet-200 focus-visible:ring-violet-500 h-8 text-sm"
													/>
													<p className="text-xs text-gray-500">Upload relevant business documentation</p>
												</div>
											</motion.div>
										)}
									</motion.div>

									{/* Submit Button */}
									<motion.div className="mt-4" layout="position">
										<Button
											type="submit"
											className={cn(
												"w-full bg-violet-600 text-white hover:bg-violet-700 h-8 text-sm",
												"transition-all duration-200 ease-in-out",
												"focus:ring-violet-500",
												"cursor-pointer",
											)}
										>
											Sign Up
										</Button>
									</motion.div>

									{/* Login Link */}
									<motion.div className="mt-2 text-center text-xs" layout="position">
										Already have an account?{" "}
										<Link href="/login" className="text-violet-600 hover:text-violet-700 font-medium">
											Log in
										</Link>
									</motion.div>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>
			</LayoutGroup>
		</div>
	)
}