import React from 'react'
import {Task} from "@/lib/types/tasks.types";
import TableData from "@/components/shared/Table";
import fetchService from "@/configs/http-service/fetch-settings";
import ticketColumns from "@/components/entities/TicketCard/TicketTable/columns";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";

const TicketTable = async ({searchParams}: {
    searchParams?: { [key: string]: string }
}) => {
    const page_size = searchParams?.page_size ?? 30
    const page = searchParams?.page ?? 0
    const search = searchParams?.search ?? ''

    const {
        data,
        status,
        ok,
    } = await fetchService.get<PaginatedFetchResponse<Task>>('report/', {
        params: {...searchParams, page_size, page, search},
        next: {
            tags: ['tasks'],
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
                columns={ticketColumns}
                data={results}
                totalPages={totalPages}
                redirectUrl={'ticket/'}
                toggleColumns
            />
        </>
    )
}

export default TicketTable