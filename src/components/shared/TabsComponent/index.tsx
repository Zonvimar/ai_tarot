'use client'
import {Tab, Tabs} from "@nextui-org/tabs";
import React, {FC} from "react";

interface TabsProps {
    tabs: { title: string, href: string, content: React.ReactNode }[],

}


const TabsComponent: FC<TabsProps> = ({tabs}) => {
    return (
        <div className="flex w-full flex-col text-md">
            <Tabs key={'tabs-users-admin'} color="primary" variant={'underlined'} aria-label="Tabs variants">
                {tabs.map(({title, href, content}) => (
                    <Tab key={href} title={title}>
                        {content}
                    </Tab>
                ))
                }
            </Tabs>
        </div>
    )
}

export default TabsComponent