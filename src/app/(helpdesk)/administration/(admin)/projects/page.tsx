import {FC, Suspense} from "react";
import DebounceSearchBar from "@/components/shared/Inputs/DebounceSearchBar";
import ProjectsTable from "@/components/entities/Admin/ProjectsTable/table";

type Props = {
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string
    }
}

const Page: FC<Props> = ({searchParams}) => {
    return (
        <Suspense>
            <div className={'flex justify-between items-center gap-2'}>
                <DebounceSearchBar/>
            </div>
            <ProjectsTable searchParams={searchParams}/>
        </Suspense>
    )
}

export default Page

