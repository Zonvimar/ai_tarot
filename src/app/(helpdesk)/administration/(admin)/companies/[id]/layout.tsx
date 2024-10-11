import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/base/resizable'
import React from 'react'

const ProjectPageLayout = ({children, tabs}: { children: React.ReactNode, tabs: React.ReactNode }) => {
    return (
        <ResizablePanelGroup direction={'horizontal'} className={'w-full flex flex-1 gap-2 rounded h-screen'}>
            <ResizablePanel defaultSize={70} className={'h-full p-1 overflow-auto flex-1 flex flex-col gap-2'}>
                {children}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} className={'flex flex-1 overflow-y-hidden flex-col gap-2'}>
                {tabs}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default ProjectPageLayout