import {checkEmailExists, registerAccount} from '@/lib/serverActions/auth'
import React, {FC, Suspense} from 'react'
import {redirect} from "next/navigation";
import UserProfileForm from "@/components/entities/Auth/UserRegisterForm";

type Props = {
    searchParams: {
        add_info?: string,
        onboardQuestion?: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {
    const onboardQuestion = searchParams?.onboardQuestion || undefined
    const handleRegister = async (fd: FormData) => {
        const res = await checkEmailExists(fd)
        if (res.status === 'ok') {
            onboardQuestion ?
                redirect(`/auth/register?addInfo=true&onboardQuestion=${onboardQuestion}`)
                :
                redirect(`/auth/register?addInfo=true`)
        }
        return res
    }

    const handleAddInfo = async (fd: FormData) => {
        const res = await registerAccount(fd)
        return res
    }

    return (
        <>
            <UserProfileForm
                onboardQuestion={onboardQuestion}
                handleAddInfo={handleAddInfo}
                handleRegister={handleRegister}
            />
        </>
    )
}

export default Page