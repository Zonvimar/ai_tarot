import React from 'react'
import NavBar from "@/components/widgets/NavBar";

const SubscriptionLayout = async({children}: { children: React.ReactNode }) => {

    return (
        <div className={'min-h-[calc(100dvh)] bg-top bg-no-repeat bg-cover bg-gradient-with-image-sub md:bg-gradient-with-image-sub-lg'}>
            <NavBar/>
            <div className={`min-h-[calc(100dvh-58px)] w-full flex justify-center overflow-y-hidden`}>
                <main className={'max-w-[568px] flex items-center justify-center w-full h-full overflow-auto'}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default SubscriptionLayout