'use client'

import UserEditForm from "@/components/user-edit-form/user-edit-form"
import { useId } from "@/context/captureIDContext"
import { useUsers } from "@/context/usersContext"

export default function Page() {

    const { id } = useId()
    const { users } = useUsers()
    const user = users.find(item => item._id === id)

    return (
        <UserEditForm user={user} />
    )
}
