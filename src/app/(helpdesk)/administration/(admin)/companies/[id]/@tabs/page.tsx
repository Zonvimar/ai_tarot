import React from 'react'
import TabsComponent from "@/components/shared/TabsComponent";
import {getCompany, getUsersInCompany} from "@/lib/serverActions/admins/companies";
import CompanyInfoTab from "@/components/entities/Admin/CompaniesTabs/CompanyInfoTab";
import CompanyUsersTab from "@/components/entities/Admin/CompaniesTabs/CompanyUsersTab";
import CompanyUsersTable from "@/components/entities/Admin/CompaniesTabs/CompanyUsersTab/table";

const Page = async({searchParams, params}: {
    searchParams: { page?: string, psz?: string, ordering?: string, search?: string, tab: string },
    params: { id: string }
}) => {
    const company = await getCompany(params.id)
    const users = await getUsersInCompany(params.id)

    const companyTabs = [
        {
            title: 'Компания',
            href: 'company',
            content: <div className={'w-full flex justify-start flex-wrap gap-2'}>
                <CompanyInfoTab company={company}/>
            </div>,
        },
        {
            title: 'Пользователи',
            href: 'users',
            content: <div className={'w-full flex overflow-y-scroll justify-start flex-wrap gap-2 items-stretch'}>
                <CompanyUsersTable searchParams={searchParams} params={params}/>
            </div>,
        },
    ]

    return (
        <>
            <TabsComponent tabs={companyTabs}/>
        </>

    )
}

export default Page