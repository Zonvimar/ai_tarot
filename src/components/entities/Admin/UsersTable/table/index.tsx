import React from 'react'
import TableData from "@/components/shared/Table";
import fetchService from "@/configs/http-service/fetch-settings";
import {Users} from "@/lib/types/user.types";
import usersColumns from "@/components/entities/Admin/UsersTable/columns";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";
import usersManagerColumns from "@/components/entities/Admin/UsersTableForManager/columns";

const UsersTable = async ({searchParams, userRole}: {
    searchParams?: { [key: string]: string },
    userRole: string
}) => {
    const page_size = searchParams?.page_size ?? 30
    const page = searchParams?.page ?? 0
    const search = searchParams?.search ?? ''

    const {
        data,
        status,
        ok,
    } = await fetchService.get<PaginatedFetchResponse<Users>>('user/list/', {
        params: {...searchParams, page_size, page, search},
        next: {
            tags: ['users'],
        },
    })
    console.log('USERS')
    console.log(data)
    if (!ok) {
        return <RouterBackInAnError/>
    }
    const {next, results = [], previous, count} = data
    const totalPages = Math.ceil(count / Number(page_size))

    return (
        <>
            <TableData
                columns={userRole === 'ADMIN' ? usersColumns : usersManagerColumns}
                data={results}
                totalPages={totalPages}
                redirectUrl={'users/'}
                toggleColumns
            />
        </>
    )
}

export default UsersTable