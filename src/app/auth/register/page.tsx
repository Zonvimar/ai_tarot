import UserProfileForm from '../../../components/entities/Auth/UserRegisterForm'
import {checkEmailExists, registerAccount} from '@/lib/serverActions/auth'
import React, {FC} from 'react'
import {redirect} from "next/navigation";

type Props = {
    searchParams: {
        add_info: string,
        onboardQuestion?: string,
    }
}

const Page: FC<Props> = ({searchParams}) => {
    const onboardQuestion = searchParams.onboardQuestion
    const handleRegister = async (fd: FormData) => {
        'use server'
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
        'use server'
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