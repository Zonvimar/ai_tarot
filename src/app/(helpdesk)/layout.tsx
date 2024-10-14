import AppNavbar from '@/components/widgets/AppNavbar'
import { TOKENS_KEYS } from '@/configs/http-service/constants/authTokens'
import {Divider} from '@nextui-org/divider'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import SideBar from "@/components/entities/SideBar";
import {checkAuth} from "@/lib/serverActions/auth";
import {store} from "next/dist/build/output/store";

const AppLayout = async({children}: { children: React.ReactNode }) => {
    const config = await checkAuth()
    console.log(config)
    if(!config.currentUser.isAuthenticated) {
        return redirect('/auth/onboard')
    }
    return (
        <div className={'min-h-[calc(100dvh)] bg-gradient-with-image bg-cover bg-center'}>
            {/*<div className={'flex overflow-hidden'}>*/}
            <AppNavbar/>
            {/*</div>*/}
            <div className={`min-h-[calc(100dvh-42px)] w-full flex items-center justify-center overflow-y-hidden`}>
                <main className={'max-w-[520px] w-full px-2 h-full overflow-auto'}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout