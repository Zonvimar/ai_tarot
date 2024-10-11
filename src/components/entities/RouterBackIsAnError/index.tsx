'use client'
import {Button} from "@nextui-org/react";
import React from "react";
import {useRouter} from "next/navigation";


const RouterBackInAnError = () => {
    const router = useRouter()
    return (
        <div className={'w-full my-auto items-center flex flex-col gap-2 justify-center text-center text-xl opacity-80'}>
            <p>Что-то пошло не так</p>
            <Button onClick={() => router.back()} variant={'bordered'}>Назад</Button>
        </div>
    )
}


export default RouterBackInAnError