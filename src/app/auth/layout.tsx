import AppNavbar from '@/components/widgets/AppNavbar'
import { TOKENS_KEYS } from '@/configs/http-service/constants/authTokens'
import {Divider} from '@nextui-org/divider'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import SideBar from "@/components/entities/SideBar";

const AppLayout = async({children}: { children: React.ReactNode }) => {
    // const store = cookies()
    // if(!store.has(TOKENS_KEYS.access)) {
    //     return redirect('/auth')
    // }
    return (
        <div className={'min-h-[calc(100dvh)] bg-[url("/img_2.png")] bg-cover bg-center'}>
            {/*<div className={'flex overflow-hidden'}>*/}
                <AppNavbar/>
            {/*</div>*/}
            {/*<div className={`h-full  overflow-y-hidden`}>*/}
                <main className={'min-h-[calc(100dvh-60px)] px-2 pt-2 h-full overflow-auto'}>
                    {children}
                </main>
            {/*</div>*/}
        </div>
    )
}

export default AppLayout