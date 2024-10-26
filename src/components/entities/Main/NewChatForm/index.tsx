'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {Spread} from "@/lib/types/spread.types";
import fetchService from "@/configs/http-service/fetch-settings";
import {Avatar, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/image";
import {Input} from "@nextui-org/input";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import {useRouter, useSearchParams} from "next/navigation";
import MessagesDisplay from "@/components/entities/message/MessageDisplay";
import QuestionInput from "@/components/shared/Inputs/QuestionInput";
import fetchAnswer from "@/lib/clientActions/chat/fetch-answer";

interface Message {
    message: string
    isUser: boolean
}

const NewChatForm = ({onboardQuestion}: {onboardQuestion: string | undefined}) => {
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

    useEffect(() => {
        console.log('onboardQuestion:', onboardQuestion); // Логируем onboardQuestion
        if (onboardQuestion && !messages.some(msg => msg.message === onboardQuestion)) {
            handleAskQuestion(onboardQuestion);
        }
    }, [onboardQuestion]);


    return (
        <>
            <div className="grid place-items-start h-full">
                <div className="flex flex-col min-h-[calc(100dvh-58px)] h-full justify-center gap-2 w-full">
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
        </>
    )
}

export default NewChatForm