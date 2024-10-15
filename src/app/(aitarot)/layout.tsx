import AppNavbar from '@/components/widgets/AppNavbar'
import {redirect} from 'next/navigation'
import React from 'react'
import {checkAuth} from "@/lib/serverActions/auth";

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