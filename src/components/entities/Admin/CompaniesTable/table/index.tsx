import React from 'react'
import TableData from "@/components/shared/Table";
import fetchService from "@/configs/http-service/fetch-settings";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import companiesColumns from "@/components/entities/Admin/CompaniesTable/columns";
import {Company} from "@/lib/types/references/companies.types";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";

const CompaniesTable = async ({searchParams}: {
    searchParams?: { [key: string]: string }
}) => {
    const page_size = searchParams?.page_size ?? 30
    const page = searchParams?.page ?? 0
    const search = searchParams?.search ?? ''

    const {
        data,
        status,
        ok,
    } = await fetchService.get<PaginatedFetchResponse<Company>>('company/', {
        params: {...searchParams, page_size, page, search},
        next: {
            tags: ['companies'],
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
                columns={companiesColumns}
                data={results}
                totalPages={totalPages}
                redirectUrl={'companies/'}
                toggleColumns
            />
        </>
    )
}

export default CompaniesTable