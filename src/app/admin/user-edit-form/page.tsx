'use client'

import UserEditForm from "@/components/user-edit-form/user-edit-form"
import { useId } from "@/context/captureIDContext"
import { useUsers } from "@/context/usersContext"
import React from "react"
import { UserEditFormData } from "@/utils/interfaces"

export default function Page() {

    const { id } = useId()
    const { users, handleEditUser } = useUsers()
    const user = users.find(item => item._id === id)

    const handleSubmit = (formData: UserEditFormData) => {
        const userData = {
            ...formData,
            membership: {
                level: formData.membershipLevel,
                status: formData.subscriptionStatus,
                loyaltyPoints: formData.loyaltyPoints,
                subscriptionExpiration: new Date(formData.subscriptionExpiration)
            },
            affiliate: formData.referralCode ? {
                referralCode: formData.referralCode
            } : undefined
        }
        handleEditUser(id, userData);
    }

    return (
        <UserEditForm 
            user={user} 
            handleSubmit={handleSubmit}
        />
    )
}
