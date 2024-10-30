'use client'
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import {Spread} from "@/lib/types/spread.types";
import SpreadCard from "@/components/entities/Main/SpreadCard";
import SubmitButton from "@/components/shared/Buttons/SubmitButton";
import FormWrapper from "@/components/shared/FormWrapper";
import MessageInput from "@/components/shared/Inputs/MessageInput";
import Link from "next/link";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import {AlignJustify} from "lucide-react";
import SideBar from "@/components/widgets/SideBar";
import React, {FC, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import fetchAnswer from "@/lib/clientActions/chat/fetch-answer";
import MessagesDisplay from "@/components/entities/message/MessageDisplay";
import QuestionInput from "@/components/shared/Inputs/QuestionInput";

interface Props {
    olderSpreads: Spread[]
}

interface Message {
    message: string
    isUser: boolean
}

const DesktopMainPage: FC<Props> = ({olderSpreads}) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const showSidebar = () => setSidebarVisible(true);
    const router = useRouter();
    const { fetchConfiguration, configuration } = useConfiguration();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [questionInputValue, setQuestionInputValue] = useState('');

    const handleAskQuestion = useCallback(async (question: string) => {
        // console.log('Asking question:', question); // Логируем вопрос
        setMessages([{ message: question, isUser: true }]);
        setQuestionInputValue('');
        await fetchAnswer(question, setMessages, fetchConfiguration, setLoading, router);
    }, [fetchConfiguration, router]);

    // useEffect(() => {
    //     console.log('onboardQuestion:', onboardQuestion); // Логируем onboardQuestion
    //     if (onboardQuestion && !messages.some(msg => msg.message === onboardQuestion)) {
    //         handleAskQuestion(onboardQuestion);
    //     }
    // }, [onboardQuestion]);

    return (
        <>
            <div className={'justify-between items-center h-full w-full lg:flex hidden'}>
                <div className={"relative flex gap-4 bg-gradient-main-chat h-full min-h-[calc(100dvh)] " +
                    "before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[rgba(14,23,36,0.85)] " +
                    "bg-center bg-cover items-center justify-start"}>
                    <div className={'grid place-items-start h-full'}>
                        <div
                            className={`flex flex-col px-2 h-full min-h-[calc(100dvh-100px)] min-w-[400px] justify-center gap-2 w-full`}>
                            <div
                                className={`flex-grow overflow-y-auto`}>
                                <div
                                    className={'flex flex-col w-full justify-start items-center gap-4 min-h-[calc(100dvh-100px)] pt-8 h-full'}>
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
                                                <SpreadCard spread={spread} redirectType={'params'}/>
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
                    </div>

                    <div className="grid place-items-start h-full">
                        <div
                            className="flex flex-col min-h-[calc(100dvh-58px)] sm:w-[580px] h-full justify-between gap-2 w-full">
                            <div className={`flex h-full justify-center gap-2  w-full`}>
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
                            <MessagesDisplay messages={messages} userName={configuration?.currentUser.username}
                                             loading={loading}/>
                            <QuestionInput
                                questionInputValue={questionInputValue}
                                setQuestionInputValue={setQuestionInputValue}
                                handleAskQuestion={handleAskQuestion}
                                loading={loading}
                            />
                        </div>
                    </div>


                </div>
                <div
                    className={"flex relative justify-center items-center bg-gradient-main-left bg-no-repeat bg-cover bg-top min-h-[calc(100dvh)] h-full w-full"}>
                    <div className={'absolute right-7 top-8'}>
                        <Button isIconOnly
                                className={'flex items-center justify-center bg-[rgba(69,69,69,0.5)] backdrop-blur-3xl rounded-full h-10 w-10'}
                                onClick={showSidebar}>
                            <AlignJustify strokeWidth={1.5} className="text-white h-5 w-7"/>
                        </Button>
                    </div>


                </div>
                <SideBar
                    open={sidebarVisible}
                    setOpen={setSidebarVisible}
                />
            </div>
        </>
    )
}

export default DesktopMainPage