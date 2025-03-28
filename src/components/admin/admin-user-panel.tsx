import { Search } from "lucide-react"
import UserTable from "../users/user-table"
import UserStats from "../users/user-stats"
import { Input } from "@/components/ui/input"
import { User } from "@/utils/interfaces"

export default function AdminUserPanel({
    users,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    handleEdit,
    handleDelete
}: {
    users: User[],
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void
    filteredUsers: User[]
    handleEdit: (id: string) => void
    handleDelete: (id: string) => void

}) {

    return (
        <div className="min-h-screen bg-gray-50">
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
                                className="pl-10 w-full text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <UserTable 
                        handleEdit={handleEdit} 
                        handleDelete={handleDelete} 
                        users={filteredUsers} 
                    />
                </div>
            </div>
        </div>
    )
}

