import React from 'react'
import TabsComponent from "@/components/shared/TabsComponent";
import {getMyProfile, getUser} from "@/lib/serverActions/user";
import BitrixLinkTab from "@/components/entities/Admin/UsersTabs/BitrixLinkTab";
import ChangeUserCard from "@/components/entities/Admin/UsersTabs/ChangeUserCard";

const Page = async({params}: {
    params: { id: string }
}) => {
    const user = await getMyProfile();
    const userInfo = await getUser(params.id)

    const usersTabs =
        user.role === 'ADMIN' ?
            [
                {
                    title: 'Пользователь',
                    href: 'user',
                    content: <div className={'w-full flex justify-start flex-wrap gap-2'}>
                        <ChangeUserCard user={userInfo} role={user.role}/>
                    </div>,
                },
                {
                    title: 'Битрикс',
                    href: 'bitrix',
                    content: <div className={'w-full flex justify-start flex-wrap gap-2 items-stretch'}>
                        <BitrixLinkTab user={userInfo}/>
                    </div>,
                }
            ]
        :
            [
                {
                    title: 'Пользователь',
                    href: 'user',
                    content: <div className={'w-full flex justify-start flex-wrap gap-2'}>
                        <ChangeUserCard user={userInfo} role={user.role}/>
                    </div>,
                },
            ]

    return (
        <>
            <TabsComponent tabs={usersTabs}/>
        </>

    )
}

export default Page