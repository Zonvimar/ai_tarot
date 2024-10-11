import React from "react";
import UserMenu from "../../widgets/UserMenu";
import {getUserInfo} from "@/lib/serverActions/user";
import SideMenu from "@/components/entities/SideBar/SideMenu";

const SideBar = async() => {
    const user = await getUserInfo();

    return (
        <>
            <aside className={'hidden lg:flex md:flex flex-col flex-1 justify-between w-[300px]'}>
                <SideMenu user={user}/>
                <UserMenu user={user}/>
            </aside>
        </>

    )
}

export default SideBar