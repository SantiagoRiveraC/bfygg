"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import UserTable from "../users/user-table"
import UserStats from "../users/user-stats"
import { Input } from "@/components/ui/input"

// Mock user data
const mockUsers = [
{
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-05-15T10:30:00",
    createdAt: "2023-01-10T08:15:00",
},
{
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2023-05-14T14:45:00",
    createdAt: "2023-01-15T09:20:00",
},
{
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Editor",
    status: "Inactive",
    lastLogin: "2023-05-10T11:20:00",
    createdAt: "2023-02-05T10:10:00",
},
{
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2023-05-15T09:15:00",
    createdAt: "2023-02-10T13:45:00",
},
{
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "User",
    status: "Pending",
    lastLogin: null,
    createdAt: "2023-05-12T15:30:00",
},
]

export default function AdminUserPanel() {

    const [searchTerm, setSearchTerm] = useState("")
    // const [users, setUsers] = useState(mockUsers)

    const users = mockUsers 

    // Filter users based on search term
    const filteredUsers = users.filter(
        (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
            <p className="text-gray-600">Manage and monitor user accounts</p>
        </div>

        <UserStats users={users} />

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">User Accounts</h2>
            <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                type="text"
                placeholder="Search users..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            </div>

            <UserTable users={filteredUsers} />
        </div>
        </div>
    )
}

