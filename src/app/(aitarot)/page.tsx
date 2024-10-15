import React, {FC} from 'react'
import MainPageForm from "@/components/entities/Main/MainPageForm";
import {loginIntoAccount} from "@/lib/serverActions/auth";
import {redirect} from "next/navigation";

type Props = {
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string,
    }
}


const Page: FC<Props> = async({searchParams}) => {
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
            <MainPageForm handleAuth={handleAuth}/>
        </>
    )
}

export default Page