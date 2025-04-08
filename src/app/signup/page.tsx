'use client'

import React, { useState } from 'react'
import { FormData } from '@/utils/interfaces'
import SignupForm from '@/components/signup-form/signup-form'
import { Toaster, toast } from 'react-hot-toast'
import { useUsers } from '@/context/usersContext'

export default function SignupPage() {
	const { handleSignUp } = useUsers()
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		birthday: "",
		userType: "member"
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Validación de contraseña
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords don't match")
			return
		}

		const userData:  any = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
			birthday: formData.birthday,
			role: formData.userType 
		}

		if (formData.userType === 'affiliate') {
			userData.affiliate = {
				companyName: formData.companyName,
				contactName: formData.contactName,
				phone: formData.phone,
				address: formData.address,
				affiliateType: formData.affiliateType,
				status: 'pending' 
			}
		}

		console.log(userData)
		handleSignUp(userData)
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