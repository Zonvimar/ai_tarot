import { redirect } from 'next/navigation'
import React from 'react'
import {getUserInfo} from "@/lib/serverActions/user";

const AdminPagesLayout = async({children}: { children: React.ReactNode }) => {
    const user = await getUserInfo()
    if(user.role === 'USER') {
        redirect('/?status=ACTIVE')
    }
    return (
        <>
            {children}
        </>
    )
}

export default AdminPagesLayout