'use client'
import React, {FC, useEffect, useState} from 'react'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import Link from "next/link";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import SubmitButton from "@/components/shared/Buttons/SubmitButton";
import {Spread} from "@/lib/types/spread.types";
import SpreadCard from "@/components/entities/Main/SpreadCard";
import {Button} from "@nextui-org/react";
import {AlignJustify, X} from "lucide-react";
import {Image} from "@nextui-org/image";
import FormWrapper from "@/components/shared/FormWrapper";
import {usePathname} from "next/navigation";
import {Input} from "@nextui-org/input";

type Props = {
    olderSpreads: Spread[],
    handleAskQuestion: (fd: FormData) => Promise<ActionResponse>,
}


const MainPageForm: FC<Props> = ({olderSpreads, handleAskQuestion}) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const pathname = usePathname();
    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);



    return (
        <div className={'justify-between items-center h-full w-full lg:flex hidden'}>
            <div className={"relative flex gap-4 bg-gradient-main-chat " +
                "before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgba(14,23,36,0.85)] " +
                "bg-center bg-cover items-center justify-start"}>
                <div
                    className={`flex min-h-[calc(100dvh)] h-full justify-center gap-2 sm:max-w-[374px] sm:ml-8 w-full`}>
                    <div
                        className={`flex-grow overflow-y-auto max-h-[calc(100dvh-120px)] sm:max-h-[calc(100dvh-60px)]`}>
                        <div className={'flex flex-col w-full items-center gap-4 h-full pt-5'}>
                            <ImageBlock imageSrc={'/onboard.png'}>
                                <h1 className={'z-10 w-full text-center text-2xl sm:text-3xl font-bold'}>
                                    Nice to meet you 👋
                                </h1>
                            </ImageBlock>
                            <div
                                className={'z-10 flex flex-col gap-2 w-full max-w-[362px] px-4 items-center justify-center'}>
                                <p className={'font-normal text-xl w-full pb-2 items-start justify-start'}>Chat
                                    History</p>
                                {
                                    olderSpreads.map((spread: Spread) => (
                                        <SpreadCard spread={spread}/>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                    <div
                        className="flex-shrink-0 sm:hidden flex justify-center flex-col pb-2 gap-2 w-full ifems-center">
                        <SubmitButton label={'Get a Tarot reading'}/>
                    </div>
                </div>
                <FormWrapper
                    action={handleAskQuestion}
                    withOutDefaultButton calcHeight={'min-h-[calc(100dvh-140px)]'}
                    customButton={
                        <div className={'flex h-full flex-col gap-2'}>
                            <Input
                                required
                                placeholder={'Ask something'}
                                name={'question'}
                                endContent={
                                    <Button
                                        type={'submit'}
                                        isIconOnly
                                        radius={'full'}
                                        className={'bg-[#22879D] w-full max-w-[62px] h-[62px] shadow-[0px_4px_14px_0px_rgba(34,135,157,1)]'}
                                    >
                                        <Image src={'/ic_send.svg'} width={24} height={24}/>
                                    </Button>
                                }
                                autoComplete="off"
                                variant={'faded'}
                                labelPlacement={'outside'}
                                classNames={{
                                    inputWrapper: 'border-[1px] h-[78px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
                                    input: [
                                        'h-full',
                                        'placeholder:text-[#E9E9E9]',
                                        'text-medium sm:text-lg',
                                    ],
                                    label: 'text-sm sm:text-xl font-semibold',
                                }}/>
                            {/*<TextField*/}
                            {/*    required*/}
                            {/*    placeholder={'Ask something'}*/}
                            {/*    name={'question'}*/}
                            {/*    endContent={*/}
                            {/*        <Button*/}
                            {/*            type={'submit'}*/}
                            {/*            isIconOnly*/}
                            {/*            radius={'full'}*/}
                            {/*            className={'bg-[#22879D]'}*/}
                            {/*        >*/}
                            {/*            <Send className={'text-white'}/>*/}
                            {/*        </Button>*/}
                            {/*    }*/}
                            {/*/>*/}
                        </div>
                    }
                    actionLabel={'Send message'}
                >
                    <div className={`flex h-full justify-center gap-2 sm:w-[580px] w-full`}>
                        {/*<div*/}
                        {/*    className={`flex-grow overflow-y-auto`}>*/}
                        <div className={'flex flex-col w-full items-center gap-4 h-full px-4'}>
                            <div className={'z-10 gap-2 flex justify-between w-full pt-1'}>
                                {/*<p className={'text-xl sm:text-3xl font-semibold'}>Aita, ai tarologist</p>*/}
                                <div
                                    className={'w-full flex gap-1 items-center justify-start text-xl sm:text-2xl font-semibold'}>
                                    Chat with Aita
                                    <div className={'bg-[#14B411] rounded-full w-2 h-2'}></div>
                                </div>
                                <div className='w-full flex gap-3 items-center justify-end'>
                                    <Link href={'#'}
                                          className={'text-lg font-semibold w-fit text-[#27ACC9] hover:underline text-center'}>
                                        Add Oracles
                                    </Link>
                                    <div
                                        className={'text-sm sm:text-lg flex items-center gap-1 bg-[#2A2A2A] rounded-3xl px-3 py-1.5'}>
                                        <p className={'flex items-end justify-end'}>300</p>
                                        <Image src={'/oracle-icon.svg'} height={22} width={24}/>
                                    </div>
                                </div>
                            </div>
                            {/*</div>*/}

                        </div>
                    </div>
                </FormWrapper>

            </div>
            <div
                className={"flex relative justify-center items-center bg-gradient-main-right bg-no-repeat bg-cover bg-top min-h-[calc(100dvh)] h-full w-full"}>
                <div className={'absolute right-7 top-8'}>
                    <Button isIconOnly
                            className={'flex items-center justify-center bg-[rgba(69,69,69,0.5)] backdrop-blur-3xl rounded-full h-10 w-10'}
                            onClick={showSidebar}>
                        <AlignJustify strokeWidth={1.5} className="text-white h-5 w-7"/>
                    </Button>
                </div>


            </div>
            {sidebarVisible && (
                <div
                    className="fixed inset-0  bg-black bg-opacity-50 z-40"
                    onClick={hideSidebar}
                />
            )}

            <ul
                className={`fixed top-0 right-0 z-50 px-4 h-screen w-[460px] bg-[#161E2C] flex flex-col gap-4 items-start transition-transform transform ${
                    sidebarVisible ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <li className="w-full flex pt-7 pr-4 justify-end items-end">
                    <Button isIconOnly className={'h-10 w-10 flex justify-center bg-[#161E2C] items-center'}
                            onClick={hideSidebar}>
                        <X className="text-white h-8 w-8"/>
                    </Button>
                </li>
                <li onClick={hideSidebar} className="w-full font-semibold text-xl text-[#27ACC9]">
                    <Link href={'/auth'}>
                        Login
                    </Link>
                    {/*<a href="#" className="w-full">*/}
                    {/*    Login*/}
                    {/*</a>*/}
                </li>
                <li onClick={hideSidebar} className="w-full font-semibold text-xl text-[#27ACC9]">
                    <Link href={'/auth/register'}>
                        Create Account
                    </Link>
                    {/*<a href="#" className="w-full ">*/}
                    {/*</a>*/}
                </li>
                <li className="w-full font-light text-xl">
                    <a href="#" className="w-full">
                        Aita
                    </a>
                </li>
                <li className="w-full font-light text-xl">
                    <a href="#" className="w-full">
                        How it works?
                    </a>
                </li>
                <li className="w-full font-light text-sm">
                    <a href="#" className="w-full">
                        Privacy policy
                    </a>
                </li>
                <li className="w-full font-light text-sm">
                    <a href="#" className="w-full">
                        Terms of Service
                    </a>
                </li>
                <li className="w-full font-light text-xl pt-7">
                    <a href="mailto:support@aitarot.io" className="w-full">support@aitarot.io</a>
                </li>
            </ul>
        </div>

    )
}

export default MainPageForm