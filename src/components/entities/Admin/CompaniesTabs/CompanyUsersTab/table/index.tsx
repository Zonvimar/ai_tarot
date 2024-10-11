import React from 'react'
import TableData from "@/components/shared/Table";
import fetchService from "@/configs/http-service/fetch-settings";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import companiesColumns from "@/components/entities/Admin/CompaniesTable/columns";
import {Company} from "@/lib/types/references/companies.types";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";
import {Users} from "@/lib/types/user.types";
import usersColumns from "@/components/entities/Admin/UsersTable/columns";

const CompanyUsersTable = async ({searchParams, params}: {
    searchParams?: { [key: string]: string },
    params: { id: string }
}) => {
    const page_size = searchParams?.page_size ?? 30
    const page = searchParams?.page ?? 0
    const search = searchParams?.search ?? ''

    const {
        data,
        status,
        ok,
    } = await fetchService.get<Users[]>(`company/${params.id}/users/`, {
        // params: {...searchParams, page_size, page, search},
        next: {
            tags: ['companies'],
        },
    })
    if (!ok) {
        return <RouterBackInAnError/>
    }
    // const {next, results = [], previous, count} = data
    // const totalPages = Math.ceil(count / Number(page_size))

    return (
        <>
            <TableData
                columns={usersColumns}
                data={data}
                // totalPages={totalPages}
                redirectUrl={'users/'}
                toggleColumns
            />
        </>
    )
}

export default CompanyUsersTable