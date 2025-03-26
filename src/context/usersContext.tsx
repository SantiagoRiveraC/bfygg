/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { User } from "@/utils/interfaces";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserContextType {
    users: User[],
    handleDeleteUser: (id: string) => void
    handleGetAllUsers: () => void
}

const UsersContext = createContext<UserContextType>({ users: [], handleDeleteUser: () => {}, handleGetAllUsers: () => {} })

export function UsersProvider({ children }: { children: ReactNode }) {

    const [users, setUsers] = useState<User[]>([])
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Bearer ${token}` } }

    const handleGetAllUsers = async () => {
        if (!token) {
            console.log('token is requiered')
            return
        }
        try {
            const res = await axios.get('/api/user/getall', headers)
            // console.log(res)
            setUsers(res.data.users)

        } catch (error) {
            console.log(error)
            setUsers([])
        }
    }

    const handleDeleteUser = async (id: string) => {
        if (!token) {
            console.log('token is requiered')
        }
        const promise = axios.delete(`/api/user/${id}`, headers)
        toast.promise(
            promise,
            {
                loading: 'deleting user',
                success: (res: AxiosResponse) => {
                    handleGetAllUsers()
                    return <>{res.data.message}</>
                },
                error: (error: AxiosError<{message?: string}>) => {
                    return <>{error?.response?.data?.message}</>
                }
            }
        )
     }

    
    useEffect(
        () => {
            handleGetAllUsers()
        },
        []
    )

    return (
        <UsersContext.Provider value={{ users, handleDeleteUser, handleGetAllUsers }}>
            {children}
        </UsersContext.Provider>
    )

}

export function useUsers() {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers debe usarse dentro de UsersProvider");
    }
    return context;
}