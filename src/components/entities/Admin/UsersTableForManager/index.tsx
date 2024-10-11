import React from 'react'
import TableData from "@/components/shared/Table";
import fetchService from "@/configs/http-service/fetch-settings";
import {Users} from "@/lib/types/user.types";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import usersManagerColumns from "@/components/entities/Admin/UsersTableForManager/columns";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";

const UsersTableForManager = async ({searchParams}: {
    searchParams?: { [key: string]: string }
}) => {
    const page_size = searchParams?.page_size ?? 30
    const page = searchParams?.page ?? 1
    const search = searchParams?.search ?? ''
    console.log('SEARCH PARAMS')
    console.log(search)

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
                columns={usersManagerColumns}
                data={results}
                totalPages={totalPages}
                redirectUrl={'employees/'}
                toggleColumns
            />
        </>
    )
}

export default UsersTableForManager