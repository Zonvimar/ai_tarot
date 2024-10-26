import React from "react";
import fetchService from '@/configs/http-service/fetch-settings';
import {Spread} from "@/lib/types/spread.types";

interface Message {
    message: string;
    isUser: boolean;
}

const fetchAnswer = async (
    question: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    fetchConfiguration: () => Promise<void>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    router: any
) => {
    setLoading(true);
    try {
        console.log('Fetching answer:', question);
        const res = await fetchService.post<Spread>('api/spread/create/', {
            body: JSON.stringify({ question }),
            credentials: 'include',
            source: 'client',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            const { answer } = res.data;
            setMessages(prev => {
                if (!prev.some(msg => msg.message === answer)) {
                    return [...prev, {message: answer, isUser: false}];
                }
                return prev;
            })
            await fetchConfiguration();
        } else if (res.status === 400) {
            router.push('/buy/oracles');
        }
    } catch (error) {
        console.error('Error fetching answer:', error);
    } finally {
        setLoading(false);
    }
};

export default fetchAnswer;
