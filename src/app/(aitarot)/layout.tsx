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
        <div className={'min-h-[calc(100dvh)] bg-gradient-main'}>
            {/*<div className={'flex overflow-hidden'}>*/}
            {/*<AppNavbar/>*/}
            {/*</div>*/}
            <div className={`min-h-[calc(100dvh)] bg-center w-full flex items-center justify-center overflow-y-hidden`}>
                <main className={'max-w-[520px] sm:max-w-full sm:items-start w-full h-full flex overflow-auto'}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout