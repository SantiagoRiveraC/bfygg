'use client'

import React, { useState } from 'react'
import { User } from '@/utils/interfaces'
import SignupForm from '@/components/signup-form/signup-form'
import { Toaster, toast } from 'react-hot-toast'
import { useUsers } from '@/context/usersContext'

export default function SignupPage() {
	const { handleSignUp } = useUsers()
	const [formData, setFormData] = useState<User>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "", 
		birthday: "",
		role: "member" 
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords don't match")
			return
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...userToSend } = formData

		if (formData.role === 'affiliate') {
			userToSend.affiliate = {
				companyName: formData.affiliate?.companyName || '',
				contactName: formData.affiliate?.contactName || '',
				phone: formData.affiliate?.phone || '',
				address: formData.affiliate?.address || '',
				affiliateType: formData.affiliate?.affiliateType || '',
				status: 'pending'
			}
		}

		console.log(userToSend)
		handleSignUp(userToSend)
	}

	return (
		<>
			<SignupForm
				formData={formData}
				setFormData={setFormData}
				handleSubmit={handleSubmit}
			/>
			<Toaster position="top-center" />
		</>
	)
}