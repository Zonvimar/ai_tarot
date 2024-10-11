import UserLoginForm from '@/components/entities/UserProfile/UserLoginForm'
import {loginIntoAccount} from '@/lib/serverActions/auth'
import React, {FC} from 'react'
import {redirect} from "next/navigation";

type Props = {
    searchParams: {
        [key: string]: string
    }
}

const Page: FC<Props> = ({searchParams}) => {
    const handleAuth = async (fd: FormData) => {
        'use server'
        const res = await loginIntoAccount(fd)
        if (res.status === 'ok') {
            redirect('/')
        }
        return res
    }
    return (
        <>
            <UserLoginForm
                handleAuth={handleAuth}
            />
        </>

    )
}

export default Page