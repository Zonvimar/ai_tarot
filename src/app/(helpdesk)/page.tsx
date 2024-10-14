import TicketCard from '@/components/entities/TicketCard'
import CreateTicketCardModal from '../../components/entities/TicketCard/modals/CreateTicketCardModal'
import React, {FC, Suspense} from 'react'
import {Task} from "@/lib/types/tasks.types";
import fetchService from "@/configs/http-service/fetch-settings";
import {PaginatedFetchResponse} from "@/configs/http-service/fetch-settings/types";
import PaginationBar from "@/components/widgets/Pagination";
import {getUserInfo} from "@/lib/serverActions/user";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/react";
import DebounceSearchBar from "@/components/shared/Inputs/DebounceSearchBar";
import TicketSort from "@/components/entities/TicketCard/TicketSort";
import TicketViewSwitcher from "@/components/entities/TicketCard/TicketViewSwitcher";
import TicketTable from "@/components/entities/TicketCard/TicketTable/table";
import RouterBackInAnError from "@/components/entities/RouterBackIsAnError";


type Props = {
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string,
        status?: string
        view_mode: "card" | "table",
    }
}


const Page: FC<Props> = async({searchParams}) => {
    //
    // const page_size = searchParams?.page_size ?? 10
    // const page = searchParams?.page ?? 0
    // const status = searchParams?.status ?? 'ACTIVE'
    // const ordering = searchParams?.ordering ?? ''
    // const user = await getUserInfo();
    // const search = searchParams?.search ?? ''
    //
    // const {ok, data} = await
    //     fetchService.get<PaginatedFetchResponse<Task>>('report/', {
    //         params: {
    //         ...searchParams, page_size, page, ordering, search, status
    //         // opt: ''
    //         },
    //         // headers: {
    //         //     'Time-Zone': clientTimeZone,
    //         // },
    //         next: {
    //             tags: ['tasks']
    //         }
    //     })
    // if (!ok) {
    //     // if (!ok) {
    //         return <RouterBackInAnError/>
    //     // }
    // }
    // const {results: tasks} = data
    // const totalPages = Math.ceil(data.count / Number(page_size))

    return (
        <>
            <h1>Main page</h1>
        </>
        // <Suspense>
        //     <div className={'max-w-[1440px] w-full flex justify-between mx-auto items-center gap-2'}>
        //         <div className={'max-h-[40px] flex gap-2 w-full items-center'}>
        //             <TicketSort/>
        //             {user.role === 'ADMIN' &&
        //                 <TicketViewSwitcher searchParams={searchParams}/>
        //             }
        //             <DebounceSearchBar/>
        //         </div>
        //         <CreateTicketCardModal user={user}/>
        //     </div>
        //     {searchParams.view_mode === 'table' ?
        //         // <div
        //         //     className={'max-w-[1440px] w-full mx-auto '}>
        //             <TicketTable searchParams={searchParams}/>
        //         // </div>
        //         :
        //         <div
        //             className={'max-w-[1440px] w-full flex flex-wrap justify-start max-gap-4 gap-3 my-2 items-stretch mx-auto '}>
        //         {tasks.length === 0 ?
        //             searchParams.search ?
        //                 <div className={'w-full  text-center text-xl opacity-80'}>По вашему запросу ничего не
        //                     найдено</div>
        //                 :
        //                 searchParams.status === 'false' ?
        //                     <>
        //                         <div className={'w-full text-center text-xl opacity-80'}>У вас нет завершенных
        //                             заявок
        //                         </div>
        //                         <Link href={'/'}><Button variant={'bordered'}>Ко всем заявкам</Button></Link>
        //                     </>
        //                     :
        //                     <div className={'w-full text-center text-xl opacity-80'}>У вас еще нет заявок</div>
        //             :
        //             tasks.map((task: Task) => (
        //                 <TicketCard key={task.id} task={task} user={user}/>
        //             ))
        //             }
        //
        //         </div>
        //     }
        //
        //     {
        //         searchParams.view_mode !== 'table' &&
        //         <div className={'max-w-[1440px] h-full mx-auto w-full relative pt-8 flex justify-center items-end'}>
        //             <div className={'max-w-[1440px] absolute bottom-0 '}>
        //                 {totalPages > 1 &&
        //                     <PaginationBar totalPages={totalPages}/>
        //                 }
        //             </div>
        //         </div>
        //     }
        // </Suspense>
    )
}

export default Page