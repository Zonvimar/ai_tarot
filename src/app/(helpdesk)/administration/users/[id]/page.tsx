import React, {FC} from 'react'
import {getUser} from "@/lib/serverActions/user";
import fetchService from "@/configs/http-service/fetch-settings";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import {Task} from "@/lib/types/tasks.types";
import TicketCard from "@/components/entities/TicketCard";
import PaginationBar from "@/components/widgets/Pagination";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";

type Props = {
    params: { id: string }
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string,
        status?: string
    }
}

const Page: FC<Props> = async ({params, searchParams}) => {
    const page_size = searchParams?.page_size ?? 10
    const page = searchParams?.page ?? 0
    const ordering = '-id'
    const user = await getUser(params.id)

    const {ok, data} = await
        fetchService.get<PaginatedFetchResponse<Task>>(`user/${params.id}/reports/`, {
            params: {
                ...searchParams, page_size, page, ordering
                // opt: ''
            },
            next: {
                tags: ['tasks']
            }
        })
    if (!ok) {
        return <RouterBackInAnError/>
    }
    const {results: tasks} = data
    const totalPages = Math.ceil(data.count / Number(page_size))


    if (tasks.length === 0) {
        return (
            <>
                <div className={'max-w-[1440px] w-full flex justify-start mx-auto items-center gap-2'}>
                    <Link href={'/administration/users/'} className={'flex items-center text-sm text-primary'}><ChevronLeft/>
                        <p>Назад</p>
                    </Link>
                </div>
                <div
                    className={'max-w-[1440px] w-full h-full justify-center flex flex-col gap-2 items-center m-auto'}>
                    <div className={'w-full text-center text-2xl'}>У пользователя нет заявок</div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={'max-w-[1440px] w-full flex justify-start mx-auto items-center gap-2'}>
                <div className={'max-w-[1440px] w-full flex items-center justify-between gap-4'}>
                    <Link href={'/administration/users/'} className={'flex items-center text-sm text-primary'}><ChevronLeft/>
                        <p>Назад</p>
                    </Link>
                    <div className={'justify-center w-full flex pr-8'}>
                        <p className={'text-lg line-clamp-1'}>Заявки пользователя</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className={'flex h-full flex-col justify-between overflow-y-auto overflow-x-hidden py-2'}>
                <div
                    className={'max-w-[1440px] h-fit w-full flex flex-wrap justify-start max-gap-4 gap-3 my-2 items-stretch mx-auto '}>
                    {tasks.map((task: Task) => (
                        <TicketCard key={task.id} task={task} user={user}/>
                    ))}
                </div>
                <div className={'max-w-[1440px] h-full mx-auto w-full relative pt-8 flex justify-center items-end'}>
                    <div className={'h-fit max-w-[1440px] absolute bottom-0'}>
                        {totalPages > 1 &&
                            <PaginationBar totalPages={totalPages}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
