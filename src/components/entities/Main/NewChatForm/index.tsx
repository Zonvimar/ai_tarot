'use client'
import React, {useCallback, useEffect, useState} from 'react'
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import {useRouter} from "next/navigation";
import MessagesDisplay from "@/components/entities/message/MessageDisplay";
import QuestionInput from "@/components/shared/Inputs/QuestionInput";
import fetchAnswer from "@/lib/clientActions/chat/fetch-answer";
import {useMediaQuery} from "react-responsive";

interface Message {
    message: string
    isUser: boolean
    images?: string[]
}

const NewChatForm = ({onboardQuestion}: {onboardQuestion: boolean}) => {
    const router = useRouter();
    const { fetchConfiguration, configuration } = useConfiguration();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [aitaIsTyping, setAitaIsTyping] = useState(false);
    const [questionInputValue, setQuestionInputValue] = useState('');
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const handleAskQuestion = async (question: string) => {
        // console.log('Asking question:', question); // Логируем вопрос
        setMessages([{ message: question, isUser: true }]);
        setQuestionInputValue('');
        await fetchAnswer(question, setMessages, fetchConfiguration, setLoading, setAitaIsTyping, router);
    }

    useEffect(() => {
        const getOnboardQuestion = async () => {
            const question = localStorage.getItem('onboardQuestion') as string;
            await handleAskQuestion(question);
            localStorage.removeItem('onboardQuestion');
        }
        if (isDesktop) {
            router.push('/')
        } else if (onboardQuestion) {
            getOnboardQuestion()
        }
    }, []);


    return (
        <>
            <div className="grid place-items-start h-full">
                <div className="flex flex-col min-h-[calc(100dvh-58px)] h-full justify-center gap-2 w-full">
                    <MessagesDisplay messages={messages} userName={configuration?.currentUser.username}
                                     loading={aitaIsTyping}/>
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