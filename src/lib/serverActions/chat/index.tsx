'use server'
import fetchService from "@/configs/http-service/fetch-settings";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {Message} from "@/lib/types/chat.types";

const askOnboardQuestion = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: ''
    }
}

const sendMessage = async (fd: FormData): Promise<ActionResponse> => {
    try {
        if(fd.get('text') === '' && fd.get('file') === '') {
            const message = 'Нельзя отправить пустое сообщение, напишите текст или прикрепите файл'
            throw new Error(message)
        }
        const res = await fetchService.post(`report/${fd.get('taskId')}/write_message/`, {
            body: JSON.stringify({
                text: fd.get('text'),
                file: fd.get('file') ? fd.get('file') : null
            }),
        })
        if (!res.ok) {
            const message = res.data?.detail
            throw new Error(message)
        }

        return {
            status: 'ok',
            message: 'Сообщение успешно отправлено'
        }
    } catch (e) {
        if(e instanceof Error) {
            return {
                status: 'error',
                message: e.message
            }
        }
        return {
            status: 'error',
            message: 'Что-то пошло не так, попробуйте еще раз, либо обратитесь в поддержку'
        }
    }
}

const getTaskMessages = async(taskId: string | number): Promise<Message[]> => {
    const res = await fetchService.get(`report/${taskId}/messages/`, {
        next: {
            tags: ['messages'],
        },
    })
    return res.data
}

export {
    askOnboardQuestion,
    getTaskMessages,
    sendMessage
}