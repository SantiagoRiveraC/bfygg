"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Edit, Trash2, UserCheck, UserX } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"



type User = {
	_id: string
	firstName: string
	email: string
	role: string
	status: string
	lastLogin: string | null
	createdAt: string
	subscriptionStatus: boolean
}

type UserTableProps = {
	users: User[]
	handleEdit: (id: string) => void
	handleDelete: (id: string) => void
}

export default function UserTable({ users,handleDelete,handleEdit }: UserTableProps) {


	const [sortField, setSortField] = useState<keyof User>("firstName")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

	const handleSort = (field: keyof User) => {
		if (sortField === field) {
		setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
		setSortField(field)
		setSortDirection("asc")
		}
	}

	const sortedUsers = [...users].sort((a, b) => {
		if (a[sortField] === null) return 1
		if (b[sortField] === null) return -1

		const aValue = a[sortField]
		const bValue = b[sortField]

		if (typeof aValue === "string" && typeof bValue === "string") {
		return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
		}
		return 0
	})

	const getStatusColor = (status: boolean) => {
		switch (status) {
		case true:
			return "bg-green-100 text-green-800 hover:bg-green-200"
		case false:
			return "bg-gray-100 text-gray-800 hover:bg-gray-200"
		default:
			return "bg-gray-100 text-gray-800 hover:bg-gray-200"
		}
	}

	const SortIcon = ({ field }: { field: keyof User }) => {
		if (sortField !== field) return null
		return sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
	}



	

	


return (
	<div className="overflow-x-auto">
	<table className="min-w-full divide-y divide-gray-200">
		<thead className="bg-gray-50">
		<tr>
			<th
			scope="col"
			className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
			onClick={() => handleSort("firstName")}
			>
			<div className="flex items-center">
				Name
				<SortIcon field="firstName" />
			</div>
			</th>
			<th
			scope="col"
			className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
			onClick={() => handleSort("email")}
			>
			<div className="flex items-center">
				Email
				<SortIcon field="email" />
			</div>
			</th>
			<th
			scope="col"
			className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
			onClick={() => handleSort("role")}
			>
			<div className="flex items-center">
				Role
				<SortIcon field="role" />
			</div>
			</th>
			<th
			scope="col"
			className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
			onClick={() => handleSort("status")}
			>
			<div className="flex items-center">
				Status
				<SortIcon field="status" />
			</div>
			</th>
			<th
			scope="col"
			className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
			onClick={() => handleSort("lastLogin")}
			>
			<div className="flex items-center">
				Last Login
				<SortIcon field="lastLogin" />
			</div>
			</th>
			<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
			Actions
			</th>
		</tr>
		</thead>
		<tbody className="bg-white divide-y divide-gray-200">
		{sortedUsers.length > 0 ? (
			sortedUsers.map((user) => (
			<tr key={user._id} className="hover:bg-gray-50">
				<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm font-medium text-gray-900">{user.firstName}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">{user.email}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">{user.role}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
				<Badge className={getStatusColor(user.subscriptionStatus)}>
					{user.subscriptionStatus ? 'active' : 'inactive'}
				</Badge>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				{user.lastLogin ? formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true }) : "Never"}
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium ">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
					<Button className="border cursor-pointer" variant="link" size="sm">
						<MoreHorizontal className="h-4 w-4 " />
					</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => handleEdit(user._id)} className="cursor-pointer border ">
						<Edit className="h-4 w-4 mr-2" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						{user.status === "Active" ? (
						<>
							<UserX className="h-4 w-4 mr-2" />
							Deactivate
						</>
						) : (
						<>
							<UserCheck className="h-4 w-4 mr-2" />
							Activate
						</>
						)}
					</DropdownMenuItem>
					<DropdownMenuItem 
						onClick={() => handleDelete(user._id)} 
						className="cursor-pointer text-red-600 focus:text-red-600"
					>
						<Trash2 className="h-4 w-4 mr-2" />
						Delete
					</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				</td>
			</tr>
			))
		) : (
			<tr>
			<td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
				No users found
			</td>
			</tr>
		)}
		</tbody>
	</table>
	</div>
)
}

