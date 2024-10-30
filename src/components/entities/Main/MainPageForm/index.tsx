'use client'
import React, {FC} from 'react'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {Spread} from "@/lib/types/spread.types";
import {useMediaQuery} from "react-responsive";
import DesktopMainPage from "@/components/entities/Main/MainPageForm/DesktopMainPage";
import MobileMainPage from "@/components/entities/Main/MainPageForm/MobileMainPage";

type Props = {
    olderSpreads: Spread[],
    handleAskQuestion: (fd: FormData) => Promise<ActionResponse>,
}


const MainPageForm: FC<Props> = ({olderSpreads, handleAskQuestion}) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });


    return (
        <>
            {isDesktop ?
                <DesktopMainPage olderSpreads={olderSpreads}/>
                :
                <MobileMainPage olderSpreads={olderSpreads}/>
            }

        </>


    )
}

export default MainPageForm