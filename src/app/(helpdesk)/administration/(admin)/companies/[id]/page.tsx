import React, {FC} from 'react'
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import DebounceSearchBar from "@/components/shared/Inputs/DebounceSearchBar";
import fetchService from "@/configs/http-service/fetch-settings";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";
import {CompanyProject} from "@/lib/types/references/project.types";
import ProjectCard from "@/components/entities/Admin/ProjectCard";
import SetCompanyProjectModal from "@/components/entities/Admin/modals/SetCompanyProjectModal";

type Props = {
    params: { id: string }
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string,
        // status?: string
    }
}

const Page: FC<Props> = async ({params, searchParams}) => {
    const page_size = searchParams?.page_size ?? 10
    const page = searchParams?.page ?? 1
    const ordering = searchParams?.ordering ?? '-id'
    const search = searchParams.search ?? ''
    const companyId = params.id

    const {ok, data} = await
        fetchService.get<CompanyProject[]>(`company/${companyId}/projects/`, {
            params: {
                ...searchParams, page_size, page, ordering, search
            },
            next: {
                tags: ['projects']
            }
        })
    if (!ok) {
        return <RouterBackInAnError/>
    }
    const projects = data
    // const totalPages = Math.ceil(data.count / Number(page_size))
    // console.log('projects')
    // console.log(data[0]._employees)
    // console.log(data)
    return (
        <>
            <div className={'max-w-[1440px] w-full flex justify-between mx-auto items-center gap-2'}>
                <div className={'max-h-[40px] flex gap-4 w-fit items-center'}>
                    <Link href={'/administration/companies/'}
                          className={'flex items-center text-sm text-primary'}><ChevronLeft/>
                        <p>Назад</p>
                    </Link>
                </div>
                {/*<div className={'justify-center w-full flex pr-8'}>*/}
                {/*    <p className={'text-lg line-clamp-1'}>Проекты компании</p>*/}
                {/*</div>*/}
                <DebounceSearchBar/>
                <SetCompanyProjectModal company={companyId} projects={projects}/>
            </div>
            <div className={'max-w-[1440px] w-full flex justify-start mx-auto items-center gap-2'}>
                {/*<div className={'flex h-full flex-col justify-between overflow-y-auto py-2'}>*/}
                <div
                    className={'max-w-[1440px] h-fit w-full flex flex-wrap justify-start max-gap-4 gap-3 my-2 items-stretch mx-auto '}>
                    {projects?.map((project: CompanyProject) => (
                        <ProjectCard key={project.id} project={project} company={companyId}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Page
