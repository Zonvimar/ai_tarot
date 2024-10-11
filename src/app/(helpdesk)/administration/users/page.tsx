import UsersTable from "@/components/entities/Admin/UsersTable/table";
import {FC, Suspense} from "react";
import DebounceSearchBar from "@/components/shared/Inputs/DebounceSearchBar";
import FilterUsers from "@/components/entities/Admin/UsersTable/config/FilterUsers";
import {getUserInfo} from "@/lib/serverActions/user";

type Props = {
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string
    }
}

const Page: FC<Props> = async({searchParams}) => {
    const user = await getUserInfo()
    return (
        <Suspense>
            <div className={'flex justify-between items-center gap-2'}>
                <DebounceSearchBar/>
                <div>
                    <FilterUsers/>
                </div>
            </div>
            <UsersTable searchParams={searchParams} userRole={user.role}/>
        </Suspense>
    )
}

export default Page

