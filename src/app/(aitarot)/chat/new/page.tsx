import React, {FC} from 'react'
import {askOnboardQuestion, askQuestion} from "@/lib/serverActions/chat";
import {redirect} from "next/navigation";
import NewChatForm from "@/components/entities/Main/NewChatForm";


type Props = {
    searchParams: {
        email: string,
        onboardQuestion?: string,
        resetPassword: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {
    const onboardQuestion = searchParams.onboardQuestion

    return (
        <>
            <NewChatForm onboardQuestion={onboardQuestion}/>
        </>
    )
}

export default Page;