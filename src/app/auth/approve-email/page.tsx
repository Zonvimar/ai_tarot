import React, {FC} from 'react'
import {redirect} from "next/navigation";
import {approveEmail, confirmReset} from "@/lib/serverActions/auth";
import VerifyEmailCodeForm from "../../../components/entities/Auth/VerifyEmailCodeForm";


type Props = {
    searchParams: {
        email: string,
        resetPassword: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {
    const email = searchParams.email ?? 'failed'
    const resetPassword = !!searchParams.resetPassword


    const handleVerify = async (fd: FormData) => {
        'use server'
        console.log(fd.get('code'))
        const res = await approveEmail(fd)
        if (res.status === 'ok') {
            redirect('/')
        }
        return res
    }

    const handleCheck = async (fd: FormData) => {
        'use server'
        console.log(fd.get('code'))
        const res = await confirmReset(fd)
        if (res.status === 'ok') {
            redirect('/auth/new-password')
        }
        return res
    }


    return (
        <>
            <VerifyEmailCodeForm
                handleVerify={handleVerify}
                handleCheck={handleCheck}
                resetPassword={resetPassword}
                email={email}
            />
        </>
    )
}

export default Page