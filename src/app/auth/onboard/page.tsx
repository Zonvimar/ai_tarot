import {loginIntoAccount} from '@/lib/serverActions/auth'
import React, {FC} from 'react'
import {redirect} from "next/navigation";
import OnBoardChatForm from "@/components/entities/Onboard/OnBoardChatForm";
import {askOnboardQuestion} from "@/lib/serverActions/chat";

type Props = {
    searchParams: {
        [key: string]: string
    }
}

const Page: FC<Props> = ({searchParams}) => {
    const handleAskQuestion = async (fd: FormData) => {
        'use server'
        const res = await askOnboardQuestion(fd)
        if (res.status === 'ok') {
            redirect(`/auth/register?onboardQuestion=${fd.get('question')}`)
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