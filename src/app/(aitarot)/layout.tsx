import AppNavbar from '@/components/widgets/AppNavbar'
import {redirect} from 'next/navigation'
import React from 'react'
import {getConfiguration} from "@/lib/serverActions/auth";

const AppLayout = async({children}: { children: React.ReactNode }) => {
    const config = await getConfiguration()
    console.log(config)
    // if(!config.currentUser.isAuthenticated) {
    //     return redirect('/auth/onboard')
    // }
    return (
        <>
            {children}
        </>
    )
}

export default AppLayout