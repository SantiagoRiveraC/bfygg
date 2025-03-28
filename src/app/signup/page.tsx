'use client'

import React, { useState } from 'react'
import { FormData } from '@/utils/interfaces'
import SignupForm from '@/components/signup-form/signup-form'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'




export default function Page() {


	const router = useRouter()
	const [formData, setFormData ] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		birthday: "",
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { confirmPassword, ...data } = formData
		
		const promise = axios.post('/api/user/create', data)
		toast.promise(
			promise,
			{
				loading: 'creating user',
				success: (res: AxiosResponse) => {
					router.push('/login')
					return <>{res.data.message}</>
				},
				error: (error: AxiosError<{ message?: string}>) => {
					return <>{error.response?.data.message}</>
				}
			}
		)

		console.log(data)
	}
	

	return (
		<>
			<SignupForm
				formData={formData}
				setFormData={setFormData}
				handleSubmit={handleSubmit}
			/>		
			<Toaster />
		</>
	)	
}
