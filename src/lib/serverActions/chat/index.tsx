'use server'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";

const askOnboardQuestion = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: ''
    }
}


export {
    askOnboardQuestion,
}