"use client"

import { useEffect, useState } from "react"
import AdminUserPanel from "@/components/admin/admin-user-panel"
import { User } from "@/utils/interfaces"
import axios from 'axios'

// Mock user data


export default function AdminPage() {

	const [ searchTerm, setSearchTerm] = useState("")
	const [users, setUser] = useState<User[]>([])
	
	const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY3ZGRlMDYxNDkzNTZjYWJhNTMyYWU5MCIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTc0MjkxMjE0NH0.ca7uMyaKPFezJH63iAcdKzJG6pLZ-4Z2kbtAEWmoiu8'
	const headers = { headers: { Authorization: `Bearer ${token}` } }

	const getUsers = async () => {
		try {
			const res = await axios.get('/api/user/getall',headers)
			setUser(res.data.users)
		} catch (error) {
			console.log(error)	
		}
	}
	console.log(users)

	// Filter users based on search term
	const filteredUsers = users.filter((user: User) => 
			user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role.toLowerCase().includes(searchTerm.toLowerCase()),	
	)



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
		/>
	)
}

