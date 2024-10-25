'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {Spread} from "@/lib/types/spread.types";
import {useRouter} from "next/navigation";
import {Avatar, Button} from "@nextui-org/react";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import {Image} from "@nextui-org/image";


const NewChatForm = ({spread}: {spread: Spread}) => {
    const router = useRouter();
    const { configuration } = useConfiguration()

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <div className={`flex flex-col min-h-[calc(100dvh-58px)] h-full justify-center gap-2 w-full`}>
                    <div
                        className={`flex-grow overflow-y-auto max-h-[calc(100dvh-250px)] sm:max-h-[calc(100dvh-190px)]`}>
                        <div className={'flex flex-col w-full gap-6 h-full '}>
                            <div className={'w-full flex flex-col justify-center text-center'}>
                                <div
                                    className={`text-medium sm:text-lg flex px-2 flex-col gap-2 text-start items-start w-full max-w-[396px]`}>
                                    <div className={'w-full flex flex-col items-end justify-end gap-2'}>
                                        <p className={'text-medium font-semibold'}>{configuration?.currentUser.username}</p>
                                        <div
                                            className={`px-4 py-3 flex items-end justify-end flex-col bg-[#27ACC9] max-w-[80vw] rounded-tl-2xl rounded-b-3xl`}>
                                            <p className={''}>
                                                I would like to get a tarot reading for the near future. I’m not sure if I should leave. Please help.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={'w-full flex flex-col items-start justify-start gap-2'}>
                                        <div className={'flex gap-1 items-center text-medium font-semibold'}>
                                            <Avatar isBordered className="w-6 h-6 text-tiny" src={'/avatar.png'}
                                                    classNames={{
                                                        base: 'ring-offset-0 ring-[#27ACC9]'
                                                    }}
                                            />
                                            <p>Aita</p>
                                        </div>
                                        
                                        <div
                                            className={`px-4 py-3 flex items-end flex-col bg-[#343434] max-w-[80vw] rounded-tr-2xl rounded-b-3xl`}>
                                            <p className={''}>
                                                I would like to get a tarot reading for the near future. I’m not sure if
                                                I should leave. Please help.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="flex-shrink-0 flex justify-center flex-col pb-3 gap-2 w-full ifems-center">
                            <p className={'text-medium font-normal text-center text-[#BEBEBE]'}>
                                This chat has ended, but you can still view its history! If you have a new question,
                                please start a new chat with me 😊
                        </p>
                        <div className={'flex w-full items-center justify-center'}>
                            <Image src={'/arrowToNewChat.svg'} height={16} width={16} radius={'none'}/>
                        </div>
                        <Button onClick={() => router.push('/chat/new')}
                                className={`flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]`}>
                            Get a Tarot reading
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewChatForm