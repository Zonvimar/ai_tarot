import React from 'react'
import TableData from "@/components/shared/Table";
import fetchService from "@/configs/http-service/fetch-settings";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import projectsColumns from "@/components/entities/Admin/ProjectsTable/columns";
import {Project} from "@/lib/types/references/project.types";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";

const ProjectsTable = async ({searchParams}: {
    searchParams?: { [key: string]: string }
}) => {
    const page_size = searchParams?.page_size ?? 30
    const page = searchParams?.page ?? 0
    const search = searchParams?.search ?? ''
    // const ordering = searchParams?.ordering ?? 'EXTERNAL'

    const {
        data,
        status,
        ok,
    } = await fetchService.get<PaginatedFetchResponse<Project>>('project/', {
        params: {...searchParams, page_size, page, search},
        next: {
            tags: ['projects'],
        },
    })
    if (!ok) {
        return <RouterBackInAnError/>
    }
    console.log(data)
    const {next, results = [], previous, count} = data
    const totalPages = Math.ceil(count / Number(page_size))

    return (
        <>
            <TableData
                columns={projectsColumns}
                data={results}
                totalPages={totalPages}
                toggleColumns
            />
        </>
    )
}

export default ProjectsTable