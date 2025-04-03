"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User } from "@/utils/interfaces"

type UserTableProps = {
	users: User[]
	handleEdit: (id: string) => void
	handleDelete: (id: string) => void
}



export default function UserTable({ users, handleDelete, handleEdit }: UserTableProps) {

	const [sortField, setSortField] = useState<keyof User | "membership.status">("firstName")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

	const handleSort = (field: keyof User | "membership.status") => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
			setSortField(field)
			setSortDirection("asc")
		}
	}



	const sortedUsers = [...users].sort((a, b) => {
		// Función helper para obtener valores de campos normales o anidados
		const getSortValue = (user: User, field: keyof User | "membership.status") => {
			if (field === "membership.status") {
				return user.membership?.status;
			}
			return user[field];
		};

		const aValue = getSortValue(a, sortField);
		const bValue = getSortValue(b, sortField);

		// Lógica de comparación
		if (aValue === null || aValue === undefined) return 1;
		if (bValue === null || bValue === undefined) return -1;

		if (aValue instanceof Date && bValue instanceof Date) {
			return sortDirection === "asc"
				? aValue.getTime() - bValue.getTime()
				: bValue.getTime() - aValue.getTime();
		}

		if (typeof aValue === "boolean" && typeof bValue === "boolean") {
			return sortDirection === "asc"
				? Number(aValue) - Number(bValue)
				: Number(bValue) - Number(aValue);
		}

		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortDirection === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		if (typeof aValue === "number" && typeof bValue === "number") {
			return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});

	const getStatusColor = (status: boolean | undefined) => {
		return status ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
	}

	const SortIcon = ({ field }: { field: keyof User | "subscriptionStatus" }) => {
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
							onClick={() => handleSort("membership.status")}
						>
							<div className="flex items-center">
								Status
								<SortIcon field="subscriptionStatus" />
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
									<div className="text-sm font-medium text-gray-900 capitalize">{user.firstName}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-500">{user.email}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-500">{user.role}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<Badge className={getStatusColor(user?.membership?.status)}>
										{user?.membership?.status ? "active" : "inactive"}
									</Badge>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button className="border cursor-pointer" variant="link" size="sm">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem onClick={() => handleEdit(user._id)} className="cursor-pointer">
												<Edit className="h-4 w-4 mr-2" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleDelete(user._id)} className="cursor-pointer">
												<Trash2 className="h-4 w-4 mr-2 text-red-500" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5} className="px-6 py-4 text-center text-gray-500">
								No users found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
