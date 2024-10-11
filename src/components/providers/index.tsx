import ThemeProvider from '@/components/providers/NextUiProvider'
import React from 'react'
import {Toaster} from 'sonner'

const AppProviders = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider>
                <Toaster />
                {children}
            </ThemeProvider>
        </>
    )
}

export default AppProviders