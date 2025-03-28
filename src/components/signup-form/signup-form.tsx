/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { FormData } from "@/utils/interfaces"


type SignupFormProps = {
	formData: FormData,
	setFormData: React.Dispatch<React.SetStateAction<FormData>>,
	handleSubmit: ( e: React.FormEvent ) => void
}


export default function SignupForm({formData, setFormData, handleSubmit }: SignupFormProps) {
	
	// Validation state
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		birthday: "",
	})

	// Password visibility state
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	// Password strength indicators
	const [passwordStrength, setPasswordStrength] = useState({
		hasMinLength: false,
		hasUpperCase: false,
		hasLowerCase: false,
		hasNumber: false,
	})

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	// Validate email format
	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	// Check password strength
	useEffect(() => {
		const { password } = formData

		setPasswordStrength({
			hasMinLength: password.length >= 8,
			hasUpperCase: /[A-Z]/.test(password),
			hasLowerCase: /[a-z]/.test(password),
			hasNumber: /[0-9]/.test(password),
		})
	}, [formData])

	// Validate form fields
	useEffect(() => {
		const newErrors = { ...errors }

		// First name validation
		if (formData.firstName.trim() && formData.firstName.length < 2) {
			newErrors.firstName = "First name must be at least 2 characters"
		} else {
			newErrors.firstName = ""
		}

		// Last name validation
		if (formData.lastName.trim() && formData.lastName.length < 2) {
			newErrors.lastName = "Last name must be at least 2 characters"
		} else {
			newErrors.lastName = ""
		}

		// Email validation
		if (formData.email.trim() && !validateEmail(formData.email)) {
			newErrors.email = "Please enter a valid email address"
		} else {
			newErrors.email = ""
		}

		// Password validation
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

		// Confirm password validation
		if (formData.confirmPassword.trim() && formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match"
		} else {
			newErrors.confirmPassword = ""
		}

		// Birthday validation
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

		setErrors(newErrors)
	}, [formData, passwordStrength])

	// Calculate password strength percentage and color
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

	// const handleSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault()
	// 	// Form submission logic would go here
	// }

	return (
		<div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 py-8 overflow-hidden">
			<div className="w-full max-w-md mx-auto">
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					<Card className="overflow-hidden border-violet-200 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 py-5 text-white">
							<CardTitle className="text-center text-xl">Create Account</CardTitle>
							<CardDescription className="text-center text-violet-100">Sign up to get started</CardDescription>
						</CardHeader>
						<CardContent className="p-5">
							<form
								onSubmit={handleSubmit}
							>
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
											className={cn(
												"border-violet-200 focus-visible:ring-violet-500 h-9",
												errors.firstName && "border-red-300 focus-visible:ring-red-500",
											)}
											value={formData.firstName}
											onChange={handleChange}
										/>
										{errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
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
											className={cn(
												"border-violet-200 focus-visible:ring-violet-500 h-9",
												errors.lastName && "border-red-300 focus-visible:ring-red-500",
											)}
											value={formData.lastName}
											onChange={handleChange}
										/>
										{errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
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
											placeholder="email@example.com"
											className={cn(
												"border-violet-200 focus-visible:ring-violet-500 h-9",
												errors.email && "border-red-300 focus-visible:ring-red-500",
											)}
											value={formData.email}
											onChange={handleChange}
										/>
										{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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
												placeholder="Password"
												className={cn(
													"border-violet-200 pr-10 focus-visible:ring-violet-500 h-9",
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
												{showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
											</button>
										</div>
										{errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

										{/* Password strength indicators */}
										{formData.password && (
											<div className="mt-2 space-y-2">
												{/* Password strength progress bar */}
												<div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
													<div
														className={`h-full ${getPasswordStrength().color} transition-all duration-300 ease-in-out`}
														style={{ width: `${getPasswordStrength().percent}%` }}
														aria-label={`Password strength: ${getPasswordStrength().percent}%`}
													/>
												</div>

												<ul className="text-xs space-y-1">
													<li className="flex items-center gap-1">
														{passwordStrength.hasMinLength ? (
															<Check className="h-3 w-3 text-green-500" />
														) : (
															<X className="h-3 w-3 text-red-500" />
														)}
														At least 8 characters
													</li>
													<li className="flex items-center gap-1">
														{passwordStrength.hasUpperCase ? (
															<Check className="h-3 w-3 text-green-500" />
														) : (
															<X className="h-3 w-3 text-red-500" />
														)}
														Contains uppercase letter
													</li>
													<li className="flex items-center gap-1">
														{passwordStrength.hasLowerCase ? (
															<Check className="h-3 w-3 text-green-500" />
														) : (
															<X className="h-3 w-3 text-red-500" />
														)}
														Contains lowercase letter
													</li>
													<li className="flex items-center gap-1">
														{passwordStrength.hasNumber ? (
															<Check className="h-3 w-3 text-green-500" />
														) : (
															<X className="h-3 w-3 text-red-500" />
														)}
														Contains number
													</li>
												</ul>
											</div>
										)}
									</div>

									{/* Confirm Password Field */}
									<div className="space-y-1.5">
										<Label htmlFor="confirmPassword" className="text-sm font-medium">
											Confirm Password
										</Label>
										<div className="relative">
											<Input
												id="confirmPassword"
												name="confirmPassword"
												type={showConfirmPassword ? "text" : "password"}
												placeholder="Confirm Password"
												className={cn(
													"border-violet-200 pr-10 focus-visible:ring-violet-500 h-9",
													errors.confirmPassword && "border-red-300 focus-visible:ring-red-500",
												)}
												value={formData.confirmPassword}
												onChange={handleChange}
											/>
											<button
												type="button"
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600"
												aria-label={showConfirmPassword ? "Hide password" : "Show password"}
											>
												{showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
											</button>
										</div>
										{errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
										{formData.confirmPassword && formData.password === formData.confirmPassword && (
											<p className="text-xs text-green-500 mt-1 flex items-center gap-1">
												<Check className="h-3 w-3" /> Passwords match
											</p>
										)}
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
											className={cn(
												"border-violet-200 focus-visible:ring-violet-500 h-9",
												errors.birthday && "border-red-300 focus-visible:ring-red-500",
											)}
											value={formData.birthday}
											onChange={handleChange}
										/>
										{errors.birthday && <p className="text-xs text-red-500 mt-1">{errors.birthday}</p>}
									</div>

									{/* Submit Button */}
									<div className="mt-5">
										<Button
											type="submit"
											className={cn(
												"w-full bg-violet-600 text-white hover:bg-violet-700 h-9",
												"transition-all duration-200 ease-in-out",
												"focus:ring-violet-500",
												"cursor-pointer",
											)}
										>
											Sign Up
										</Button>
									</div>

									{/* Login Link */}
									<div className="mt-4 text-center text-sm">
										Already have an account?{" "}
										<Link href="/login" className="text-violet-600 hover:text-violet-700 font-medium">
											Log in
										</Link>
									</div>
								</div>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	)
}

