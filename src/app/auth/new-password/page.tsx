import {loginIntoAccount} from '@/lib/serverActions/auth'
import React, {FC} from 'react'
import {redirect} from "next/navigation";
import NewPasswordForm from "@/components/entities/Auth/NewPasswordForm";

type Props = {
    searchParams: {
        [key: string]: string
    }
}

const Page: FC<Props> = ({searchParams}) => {
    const handleResetPassword = async (fd: FormData) => {
        'use server'
        const res = await loginIntoAccount(fd)
        // if (res.status === 'ok') {
            redirect('/')
        // }
        return res
    }
    return (
        <>
            <NewPasswordForm
                handleResetPassword={handleResetPassword}
            />
        </>
    )
}

export default Page