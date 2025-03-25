"use client"

import axios from 'axios'
import { useEffect, useState } from "react"
import AdminUserPanel from "@/components/admin/admin-user-panel"
import { User } from "@/utils/interfaces"

export default function AdminPage() {

	const [ searchTerm, setSearchTerm] = useState("")
	const [users, setUser] = useState<User[]>([])

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