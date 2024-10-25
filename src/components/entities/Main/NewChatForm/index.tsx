'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {Spread} from "@/lib/types/spread.types";
import fetchService from "@/configs/http-service/fetch-settings";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/image";
import {Input} from "@nextui-org/input";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import {useRouter} from "next/navigation";


const NewChatForm = ({onboardQuestion}: {onboardQuestion: string | undefined}) => {
    const router = useRouter();
    const { fetchConfiguration, configuration } = useConfiguration();
    const [messages, setMessages] = useState<{ message: string, isUser: boolean }[]>([]);
    const [loading, setLoading] = useState(false);
    const [questionInputValue, setQuestionInputValue] = useState('');

    const handleAskQuestion = useCallback(async (question: string) => {
        setMessages(prevMessages => [...prevMessages, { message: question, isUser: true }]);
        setQuestionInputValue(''); // очищаем поле ввода
    }, []);

    const getAnswer = useCallback(async (question: string) => {
        setLoading(true);
        try {
            const res = await fetchService.post<Spread>('api/spread/create/', {
                body: JSON.stringify({ question }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                source: 'client',
                next: {
                    tags: ['all']
                }
            });
            if (res.ok) {
                await fetchConfiguration();
                setMessages(prevMessages => [...prevMessages, { message: res.data.answer, isUser: false }]);
            } else if (res.status === 400) {
                router.push('/buy/oracles')
            }
        } catch (error) {
            console.error('Error fetching answer:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (onboardQuestion) {
            setMessages([{ message: onboardQuestion, isUser: true }]);
        }
    }, [onboardQuestion]);

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].isUser) {
            getAnswer(messages[messages.length - 1].message);
        }
    }, [messages, getAnswer]);

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <div className={`flex flex-col min-h-[calc(100dvh-58px)] h-full justify-center gap-2 w-full`}>
                    <div
                        className={`flex-grow overflow-y-auto max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-190px)]`}>
                        <div className={'flex flex-col w-full gap-6 h-full '}>
                            <div className={'w-full flex flex-col justify-center text-center'}>
                                <div
                                    className={`text-medium sm:text-lg flex pl-2 flex-col gap-2 text-start items-start w-[70vw] max-w-[396px]`}>
                                    {
                                        messages.map((m) => (
                                            m.isUser
                                                ?
                                                <div
                                                    className={`px-4 py-3 flex items-end flex-col bg-[#343434] rounded-tr-2xl rounded-b-3xl`}>
                                                    <p className={''}>
                                                        {m.message}
                                                    </p>
                                                    <span className={''}>
                                                        (user)
                                                    </span>
                                                </div>
                                                :
                                                <div
                                                    className={`px-4 py-3 flex items-end flex-col bg-[#343434] rounded-tr-2xl rounded-b-3xl`}>
                                                    <p className={''}>
                                                        {m.message}
                                                    </p>
                                                    <span className={''}>
                                                        21:32
                                                    </span>
                                                </div>
                                        ))
                                    }
                                </div>
                                <div
                                    className={`${!loading ? 'hidden' : ''} flex gap-2 text-center items-center justify-center w-full pb-2 pt-3`}>
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
                            </div>
                        </div>


                        {/*{children}*/}
                    </div>
                    <div className="flex-shrink-0 flex justify-center flex-col gap-2 w-full ifems-center">
                        <Input
                            required
                            isDisabled={loading}
                            // isReadOnly={loading}
                            placeholder={'Ask something'}
                            name={'question'}
                            onValueChange={(value) => setQuestionInputValue(value)}
                            endContent={
                                <Button onClick={() => handleAskQuestion(questionInputValue)}
                                    type={'button'}
                                    isIconOnly
                                    // radius={'full'}
                                    className={'bg-[#22879D] w-full rounded-full max-w-[44px] sm:max-w-[62px] h-[44px] sm:h-[62px] shadow-button'}
                                >
                                    <Image src={'/ic_send.svg'} radius={'none'} width={20} height={20}/>
                                </Button>
                            }
                            autoComplete="off"
                            variant={'faded'}
                            radius={'lg'}
                            labelPlacement={'outside'}
                            classNames={{
                                inputWrapper: 'border-[1px] h-[60px] sm:h-[78px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
                                input: [
                                    'h-full',
                                    'placeholder:text-[#E9E9E9]',
                                    'text-medium sm:text-lg',
                                ],
                                label: 'text-sm sm:text-xl font-semibold',
                            }}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewChatForm