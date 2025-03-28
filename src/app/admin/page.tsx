"use client"

// import axios from 'axios'
import { useState } from 'react';
import AdminUserPanel from "@/components/admin/admin-user-panel"
import { User } from "@/utils/interfaces"
import { toast, Toaster } from 'react-hot-toast'
import { useUsers } from '@/context/usersContext';
import { Button, Typography } from '@mui/material';
import { Trash } from '@phosphor-icons/react';
import { useId } from '@/context/captureIDContext';
import { useRouter } from 'next/navigation';



export default function AdminPage() {

	const [searchTerm, setSearchTerm] = useState("")
	const { users, handleDeleteUser } = useUsers()
	const { setId } = useId()
	const router = useRouter()

	
	const filteredUsers = users.filter((user: User) => {
		const lowerSearch = searchTerm.toLowerCase();
		return (
			user.firstName?.toLowerCase().includes(lowerSearch) ||
			user.email?.toLowerCase().includes(lowerSearch) ||
			user.role?.toLowerCase().includes(lowerSearch) 
		);
	});


	const handleEdit = (id: string) => {
		setId(id)
		router.push('/user-edit-form')
		// console.log(id)
	}


	const handleDelete = (id: string) => {
		console.log(id)
		const user = users.find(item => item._id === id)
		toast(() => (
			<div className='w-[10rem] flex flex-col items-center gap-2 capitalize'>
				<Typography>delete <b>{user?.firstName}</b></Typography>
				<Button
					color='error'
					fullWidth
					onClick={() => handleDeleteUser(id)}
				>
					<Trash size={20} />
				</Button>				
			</div>
		))
	}
	

	return (
		<>
			<AdminUserPanel
				users={users}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				filteredUsers={filteredUsers}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
			<Toaster />
		</>
	)
}