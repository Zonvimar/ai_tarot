import React from 'react'
import TableData from "@/components/shared/Table";
import fetchService from "@/configs/http-service/fetch-settings";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import statusesColumns from "@/components/entities/Admin/StatusesTable/columns";
import {Status} from "@/lib/types/references/status.types";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";

const StatusesTable = async ({searchParams}: {
    searchParams?: { [key: string]: string }
}) => {
    const page_size = searchParams?.page_size ?? 30
    const page = searchParams?.page ?? 0
    const search = searchParams?.search ?? ''

    const {
        data,
        status,
        ok,
    } = await fetchService.get<PaginatedFetchResponse<Status>>('project_status/', {
        params: {...searchParams, page_size, page, search},
        next: {
            tags: ['statuses'],
        },
    })
    if (!ok) {
        return <RouterBackInAnError/>
    }
    const {next, results = [], previous, count} = data
    const totalPages = Math.ceil(count / Number(page_size))

    return (
        <>
            <TableData
                columns={statusesColumns}
                data={results}
                totalPages={totalPages}
                toggleColumns
            />
        </>
    )
}

export default StatusesTable