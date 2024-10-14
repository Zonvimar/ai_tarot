import UserProfileForm from '@/components/entities/UserProfile/UserProfileForm'
import FormWrapper from '@/components/shared/FormWrapper'
import {checkEmailExists, registerAccount, successResponse} from '@/lib/serverActions/auth'
import Link from 'next/link'
import React, {FC} from 'react'
import {redirect} from "next/navigation";
import {Image} from "@nextui-org/image";
import SubmitButton from "@/components/shared/Buttons/SubmitButton";

type Props = {
    searchParams: {
        add_info: string
    }
}

const Page: FC<Props> = ({searchParams}) => {
    const addInfo = !!searchParams.add_info

    const handleRegister = async (fd: FormData) => {
        'use server'
        const res = await checkEmailExists(fd)
        if (res.status === 'ok') {
            redirect(`/auth/register?addInfo=true`)
        }
        return res
    }

    const handleAddInfo = async (fd: FormData) => {
        'use server'
        const res = await registerAccount(fd)
        if (res.status === 'ok') {
            redirect(`/auth/approve-email?email=${fd.get('email')}`)
        }
        return res
    }

    return (
        <>
            <UserProfileForm
                // addInfo={addInfo}
                handleAddInfo={handleAddInfo}
                handleRegister={handleRegister}
            />
        </>
    )
}

export default Page