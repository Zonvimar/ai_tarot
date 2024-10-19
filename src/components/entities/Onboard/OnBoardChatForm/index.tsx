'use client'
import React, {useEffect, useState} from 'react'
import {Image} from "@nextui-org/image";
import FormWrapper from "@/components/shared/FormWrapper";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {Button, cn} from "@nextui-org/react";
import {CircleHelp, Send} from "lucide-react";
import ModalComponent from "@/components/shared/ModalComponent";
import {redirect} from "next/navigation";
import {Input} from "@nextui-org/input";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import {useRouter} from "next/navigation";
import MessageInput from "@/components/shared/Inputs/MessageInput";


const OnBoardChatForm = ({handleAskQuestion}: {handleAskQuestion: (fd: FormData) => Promise<ActionResponse>}) => {
    const [showFirstMessage, setShowFirstMessage] = useState(false)
    const [showSecondMessage, setShowSecondMessage] = useState(false)
    const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false)
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            setShowFirstMessage(true)
        }, 2000);
        setTimeout(() => {
            setShowSecondMessage(true)
        }, 5000);
    }, []);


    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper
                    action={handleAskQuestion}
                    withOutDefaultButton calcHeight={'max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-190px)]'}
                    customButton={
                            <MessageInput
                                required
                                placeholder={'Ask your question for free'}
                                name={'question'}
                            />
                    }
                    actionLabel={'Send message'}
                >
                    <div className={'flex flex-col w-full gap-6 h-full '}>
                        <div className={'w-full flex flex-col justify-center text-center'}>
                            <ImageBlock imageSrc={'/onboard.png'}/>
                            <div
                                className={`${showSecondMessage ? 'hidden' : ''} flex gap-2 text-center items-center justify-center w-full pb-2 pt-3`}>
                                <div className="flex space-x-1 justify-center items-center">
                                    <div
                                        className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown rounded-full"></div>
                                    <div
                                        className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown2 rounded-full"></div>
                                    <div
                                        className="w-1.5 h-1.5 bg-[#BEBEBE] animate-scaleUpDown3 rounded-full"></div>
                                </div>
                                <p className={'text-[#BEBEBE]'}>
                                    Aita is typing
                                </p>
                            </div>
                            <div className={`${showSecondMessage && 'pt-5'} text-medium sm:text-lg flex pl-2 flex-col gap-2 text-start items-start w-[70vw] max-w-[396px]`}>
                                <div
                                    className={`${!showFirstMessage && 'hidden'} px-4 py-3 flex items-end flex-col bg-[#343434] rounded-tr-2xl rounded-b-3xl`}>
                                    <p className={''}>
                                        Hi 💚 I'm Aita, an AI tarot reader
                                    </p>
                                    <span className={''}>
                                        21:32
                                    </span>
                                </div>
                                <div
                                    className={`${!showSecondMessage && 'hidden'} px-4 py-3 flex items-end flex-col bg-[#343434] rounded-tr-2xl rounded-b-3xl`}>
                                    <p className={''}>
                                        Ask me a question for
                                        <span className={'font-bold'}>a free tarot reading</span>,
                                        with text and voice messages included! 🔮
                                    </p>
                                    <span className={''}>
                                        21:32
                                    </span>
                                </div>
                                <ModalComponent
                                    open={howItWorksModalOpen}
                                    modalSize={'md'}
                                    setOpen={setHowItWorksModalOpen}
                                    nonButtonTrigger={
                                        <div onClick={() => setHowItWorksModalOpen(true)}
                                            className={`${!showSecondMessage && 'hidden'} cursor-pointer flex gap-1 text-[#3BB4CE] pl-2 pt-1`}>
                                            <CircleHelp className={'rounded-full text-white bg-[#3BB4CE]'}/>
                                            <p>How it works?</p>
                                        </div>
                                    }
                                >
                                    <div className={'flex flex-col gap-8'}>
                                        <p>
                                            I am Aita, an <span className={'font-bold'}>AI tarot reader developed with the guidance
                                        of many real-life tarot readers</span>.
                                            I work almost like a human, offering interpretations, insights,
                                            and advice just as they would.
                                        </p>
                                        <p className={''}>
                                            <span className={'font-bold'}>Here’s how it works:</span>
                                            <ol type={'1'} className={'list-decimal pl-6'}>
                                                <li>
                                                    Write your question in the text field below ✍️
                                                </li>
                                                <li>
                                                    I’ll provide you with:
                                                    <ul className={'list-disc pl-5'}>
                                                        <li>
                                                            A detailed tarot spread 🃏
                                                        </li>
                                                        <li>
                                                            Card photos 📸
                                                        </li>
                                                        <li>
                                                            A voice message with the interpretation 🎙️
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ol>
                                        </p>
                                    </div>
                                    <div className={'pt-2 w-full items-center'}>
                                        <Button size={'lg'}
                                                className={cn(`flex w-full items-center gap-2 sticky bg-[#27ACC9] h-[60px] font-semibold text-xl rounded-[60px]`)}
                                                type={'button'}
                                                onClick={() => router.replace('/auth/register')}
                                        >
                                            Ask question for free
                                        </Button>
                                    </div>
                                </ModalComponent>
                            </div>
                        </div>

                    </div>
                </FormWrapper>
            </div>
        </>
    )
}

export default OnBoardChatForm