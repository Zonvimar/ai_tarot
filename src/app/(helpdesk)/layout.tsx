import AppNavbar from '@/components/widgets/AppNavbar'
import { TOKENS_KEYS } from '@/configs/http-service/constants/authTokens'
import {Divider} from '@nextui-org/divider'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import SideBar from "@/components/entities/SideBar";

const AppLayout = async({children}: { children: React.ReactNode }) => {
    const store = cookies()
    if(!store.has(TOKENS_KEYS.access)) {
        return redirect('/auth')
    }
    return (
        <div className={'h-[calc(100dvh)] bg-content1'}>
            <AppNavbar/>
            <div className={`h-[calc(100dvh-60px)] flex overflow-y-hidden bg-content1`}>
                <div className={'hidden lg:flex md:flex'}>
                    <SideBar/>
                    <Divider orientation={'vertical'}/>
                </div>
                {/*<Divider orientation={'vertical'}/>*/}
                <main className={'bg-content2 p-4 overflow-auto flex-1 flex flex-col gap-2'}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout