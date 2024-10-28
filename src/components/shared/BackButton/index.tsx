'use client'
import {Image} from "@nextui-org/image";
import React from "react";
import {usePathname, useRouter} from "next/navigation";

const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()

    const getLink = () => {
        switch(pathname) {
            case '/chat/new':
            case '/chat/[id]':
                return '/'
            case '/auth/register':
            case '/auth/approve-email':
            case '/auth/reset-password':
            case '/auth/new-password':
                return '/auth'
            case '/auth':
                return '/auth/register'
            default:
                return '/'
        }
    }

    const getLinkVisible = () => {
        switch(pathname) {
            case '/':
            case '/auth/onboard':
                return false
            case '/chat/new':
            case '/chat/[id]':
            case '/auth':
            case '/auth/register':
            case '/auth/approve-email':
            case '/auth/reset-password':
            case '/auth/new-password':
            case '/buy/oracles':
            case '/buy/subscription':
                return true
            default:
                return false
        }
    }


    return (
        getLinkVisible() &&
        <div onClick={() => {
            router.push(getLink())
        }} className={'cursor-pointer w-[15px] h-[15px]'}>
            <Image src={'/chevronLeft.svg'} height={15} width={9}/>
        </div>
    )
}

export default BackButton;