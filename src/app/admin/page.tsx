"use client"

import axios from 'axios'
import { useEffect, useState } from "react"
import AdminUserPanel from "@/components/admin/admin-user-panel"
import { User } from "@/utils/interfaces"



export default function AdminPage() {

	const [ searchTerm, setSearchTerm] = useState("")
	const [users, setUser] = useState<User[]>([])
	
	// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ZTE4MzM2MWViNTE0ZDYyODE1N2Q2NyIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTc0MzAwMDU4MH0.1tyuuFe4moqYcI1GpAqsZ7wOP4EGJqAfzXk4v9nQ5mQ'
	// const headers = { headers: { Authorization: `Bearer ${token}` } }

	const getUsers = async () => {
		try {
			const token = localStorage.getItem('token')
			const headers = { headers: { Authorization: `Bearer ${token}` } }
			const res = await axios.get('/api/user/getall',headers)
			setUser(res.data.users)
		} catch (error) {
			console.log(error)	
		}
	}
	// console.log(users)

	// Filter users based on search term
	const filteredUsers = users.filter((user: User) => 
			user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role.toLowerCase().includes(searchTerm.toLowerCase()),	
	)


	const handleEdit = (id: string) => {
		
		console.log(id)
	}

	const handleDelete = (id: string) => {
		console.log(id)
	}
	


	useEffect(
		() => {
			getUsers()
		},
		[]
	)

	return (
		<AdminUserPanel
			users={users}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
			filteredUsers={filteredUsers}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}