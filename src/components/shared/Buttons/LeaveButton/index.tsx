'use client'
import {ExitIcon} from "@radix-ui/react-icons";
import {Link} from "@nextui-org/link";
import {deleteCookie} from "cookies-next";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {Spinner} from "@nextui-org/react";


const LeaveButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    return (
        <Link onClick={event => {
            event.preventDefault()
            setLoading(true)
            router.push('/auth')
            deleteCookie(TOKENS_KEYS.refresh)
            deleteCookie(TOKENS_KEYS.access)
            setLoading(false)
        }} className={'transition-background hover:cursor-pointer flex justify-between font-light text-sm text-red-500 hover:text-white hover:bg-red-500 py-4 px-4 items-center rounded-md'}>
            {!loading ?
                <>
                    <p>Выйти из аккаунта</p>
                    <ExitIcon className={'mr-2'}/>
                </>
                :
                <>
                    <p>Выйти из аккаунта</p>
                    <Spinner className={'mr-2'}/>
                </>
            }

        </Link>
    )
}

export default LeaveButton;