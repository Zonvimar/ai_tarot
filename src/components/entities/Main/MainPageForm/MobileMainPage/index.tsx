'use client'

import ImageBlock from "@/components/entities/Auth/ImageBlock";
import {Spread} from "@/lib/types/spread.types";
import SpreadCard from "@/components/entities/Main/SpreadCard";
import {Button} from "@nextui-org/react";
import React, {FC} from "react";
import {useRouter} from "next/navigation";

interface Props {
    olderSpreads: Spread[]
}


const MobileMainPage: FC<Props> = ({olderSpreads}) => {
    const router = useRouter();

    return (
        <div
            className={`flex flex-col px-2 min-h-[calc(100dvh-58px)] lg:hidden h-full justify-center gap-2 w-full`}>
            <div
                className={`flex-grow overflow-y-auto max-h-[calc(100dvh-140px)] sm:max-h-[calc(100dvh-60px)]`}>
                <div className={'flex flex-col w-full items-center gap-4 h-full pt-5'}>
                    <ImageBlock imageSrc={'/onboard.png'}>
                        <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
                            Nice to meet you 👋
                        </h1>
                    </ImageBlock>
                    <div
                        className={'flex flex-col gap-2 w-full max-w-[362px] pb-3 px-4 items-center justify-center'}>
                        <p className={'font-normal text-xl w-full pb-2 items-start justify-start'}>Chat
                            History</p>
                        {
                            olderSpreads.map((spread: Spread) => (
                                <SpreadCard spread={spread} redirectType={'page'}/>
                            ))
                        }
                    </div>
                </div>

            </div>
            <div
                className="flex-shrink-0 flex justify-center  flex-col pb-3 gap-2 w-full ifems-center">
                <Button onClick={() => router.push('/chat/new')}
                        className={`flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]`}>
                    Get a Tarot reading
                </Button>
                {/*<SubmitButton label={'Get a Tarot reading'}/>*/}
            </div>
        </div>
    )
}

export default MobileMainPage