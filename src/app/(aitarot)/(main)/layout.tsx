import React from 'react'
import NavBar from "../../../components/widgets/NavBar";

const AppLayout = async({children}: { children: React.ReactNode }) => {

    return (
        <div className={'min-h-[calc(100dvh)] bg-center bg-cover bg-gradient-with-image-chat lg:bg-gradient-main'}>
            {/*<div className={'flex overflow-hidden'}>*/}
            <NavBar/>
            {/*</div>*/}
            <div className={`min-h-[calc(100dvh-58px)] lg:min-h-[calc(100dvh) w-full flex items-center justify-center overflow-y-hidden`}>
                <main className={'max-w-[520px] lg:max-w-full sm:items-start w-full h-full flex overflow-auto'}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout