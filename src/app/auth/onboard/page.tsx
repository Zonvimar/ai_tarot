import {loginIntoAccount} from '@/lib/serverActions/auth'
import React, {FC} from 'react'
import {redirect} from "next/navigation";
import OnBoardChatForm from "@/components/entities/Onboard/OnBoardChatForm";

type Props = {
    searchParams: {
        [key: string]: string
    }
}

const Page: FC<Props> = ({searchParams}) => {
    const handleAskQuestion = async (fd: FormData) => {
        'use server'
        const res = await loginIntoAccount(fd)
        if (res.status === 'ok') {
            redirect('/')
        }
        return res
    }
    return (
        <>
            <OnBoardChatForm
                handleAskQuestion={handleAskQuestion}
            />
        </>

    )
}

export default Page