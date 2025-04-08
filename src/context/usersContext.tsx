"use client";

import { User } from "@/utils/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoginForm } from "@/utils/interfaces";
import { NextResponse } from "next/server";

interface UserContextType {
	users: User[];
	loggedInUser: User | null
	handleDeleteUser: (id: string) => void;
	handleEditUser: (id: string, data: object) => void;
	handleGetAllUsers: () => void;
	handleLogin: (data: LoginForm) => void
	handleLogOut: () => void
	handleSignUp: (data: FormData) => void
}

const UsersContext = createContext<UserContextType>({
	users: [],
	loggedInUser: null,
	handleDeleteUser: () => {},
	handleEditUser: () => {},
	handleGetAllUsers: () => {},
	handleLogin: () => {},
	handleLogOut: () => {},
	handleSignUp: () => {}
});

export function UsersProvider({ children }: { children: ReactNode }) {

	const [users, setUsers] = useState<User[]>([]);
	const router = useRouter()
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
	


	const routerRole = (role: string) => {
		return router.push(`/${role}/dashboard`)
	}
	
	const hanldeAuthUser = async () => {
		const token = localStorage.getItem('token')
		const headers = { headers: { Authorization: `Bearer ${token}` } }
		
		if (!token) {
			return
		}
		try {
			const res = await axios.get('/api/user/auth', headers)
			setLoggedInUser(res.data.user)
		} catch (error) {
			setLoggedInUser(null)
			return NextResponse.json(
				{ message: 'Internal Server Error', error },
				{ status: 500 }
			)
		}
	}

	const handleGetAllUsers = async () => {
		const token = localStorage.getItem('token')
		const headers = { headers: { Authorization: `Bearer ${token}` } };

		if (!token) {
			return;
		}
		try {
			const res = await axios.get("/api/user/getall", headers);
			setUsers(res.data.users);
		} catch {
			setUsers([]);
		}
	};

	const handleDeleteUser = async (id: string) => {
		const token = localStorage.getItem('token')
		const headers = { headers: { Authorization: `Bearer ${token}` } };

		if (!token) {
			return
		}
		const promise = axios.delete(`/api/user/${id}`, headers);
		toast.promise(
			promise, 
			{
				loading: "deleting user",
				success: (res: AxiosResponse) => {
					handleGetAllUsers();
					return <>{res.data.message}</>;
				},
				error: (error: AxiosError<{ message?: string }>) => {
					return <>{error?.response?.data?.message}</>;
				},
			},{ style: { textTransform: 'capitalize'}}
		);
	};

	const handleEditUser = async (id: string, data: object) => {
		
		const token = localStorage.getItem('token')
		const headers = { headers: { Authorization: `Bearer ${token}` } };

		const promise = axios.put(`/api/user/${id}`,data,headers)
		toast.promise(
			promise,
			{
				loading: 'editing user',
				success: (res: AxiosResponse) => {
					handleGetAllUsers()
					setTimeout(() => {
						router.push('/admin/dashboard')
					}, 1000);
					return <>{res.data.message}</>
				},
				error: (error: AxiosError<{message?: string }>) => {
					return <>{error.response?.data.message}</>
				}
			},{ style: {textTransform: 'capitalize'}}	
		)
	}

	const handleLogin = async (data: LoginForm) => {
		const promise = axios.post('/api/login', data)
		toast.promise(
			promise,
			{
				loading: 'logging in',
				success: (res: AxiosResponse) => {
					localStorage.setItem('token', res.data.token)
					const role = res.data.user.role
					hanldeAuthUser()
					routerRole(role)
					return <>{res.data.message}</>
				},
				error: (error: AxiosError<{ message?: string }>) => {
					console.log(error)
					return <>{error.response?.data.message}</>
				}
			}, { style: { textTransform: 'capitalize' } }
		)
	}

	const handleLogOut = () => {
		const token = localStorage.getItem('token')
		if (!token) {
			return toast.error('internal server error')
		}
		localStorage.removeItem('token')
		toast.success('session closed successfully',{ style: { textTransform: 'capitalize'}})
		setTimeout(() => {
			setLoggedInUser(null)
			router.push('/')
		}, 1000);
	}
	
	const handleSignUp = async (data: FormData) => {
		const promise = axios.post('/api/user/create', data)
		toast.promise(
			promise,
			{
				loading: 'creating account...',
				success: (res: AxiosResponse) => {
					router.push('/login')
					return <>{ res.data.message}</>
				},
				error: (error: AxiosError<{ message?: string}>) => {
					return <>{ error.response?.data.message}</>
				}
			},{ style: { textTransform: 'capitalize'}}
		)
	}


	useEffect(
		() => {
			hanldeAuthUser()
		},
		[]
	)

	return (
		<UsersContext.Provider
		value={{ users, loggedInUser, handleDeleteUser, handleGetAllUsers, handleEditUser, handleLogin, handleLogOut, handleSignUp }}
		>
		{children}
		</UsersContext.Provider>
	);
}

export function useUsers() {
	const context = useContext(UsersContext);
	if (!context) {
		throw new Error("useUsers debe usarse dentro de UsersProvider");
	}
	return context;
}
