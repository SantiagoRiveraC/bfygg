import { Users, UserCheck, UserX, Clock } from "lucide-react"
import { User } from '@/utils/interfaces'

type UserStatsProps = {
	users: User[]
}

export default function UserStats({ users }: UserStatsProps) {
	const totalUsers = users.length
	const activeUsers = users.filter((user) => user.subscriptionStatus === true).length
	const inactiveUsers = users.filter((user) => user.subscriptionStatus === false).length

	/* 	const newUsersThisMonth = users.filter((user) => {
			const createdDate = user.createAt
			const now = new Date()
			return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
		}).length
	 */
	const stats = [
		{
			title: "Total Users",
			value: totalUsers,
			icon: Users,
			color: "bg-blue-100 text-blue-800",
		},
		{
			title: "Active Users",
			value: activeUsers,
			icon: UserCheck,
			color: "bg-green-100 text-green-800",
		},
		{
			title: "Inactive Users",
			value: inactiveUsers,
			icon: UserX,
			color: "bg-red-100 text-red-800",
		},
		/* 		{
					title: "New This Month",
					value: newUsersThisMonth,
					icon: Clock,
					color: "bg-purple-100 text-purple-800",
				}, */
	]

	return (
		<div className="flex flex-wrap gap-4 mb-8">
			{stats.map((stat, index) => (
				<div key={index} className="bg-white rounded-lg shadow-md p-6 flex-1 min-w-[200px]">
					<div className="flex items-center">
						<div className={`p-3 rounded-full ${stat.color} mr-4`}>
							<stat.icon className="h-6 w-6" />
						</div>
						<div>
							<p className="text-sm font-medium text-gray-500">{stat.title}</p>
							<p className="text-2xl font-bold text-gray-900">{stat.value}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

