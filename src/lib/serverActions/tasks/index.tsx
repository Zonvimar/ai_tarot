'use server'
import fetchService from "@/configs/http-service/fetch-settings"
import {ActionResponse} from "@/configs/http-service/fetch-settings/types"
import {Task} from "@/lib/types/tasks.types"
import { revalidateTag } from "next/cache"


const createTask = async (fd: FormData): Promise<ActionResponse> => {
    try {
        if (fd.get('file_id') === '') fd.delete('file_id')

        const res = await fetchService.post('report/', {
            body: JSON.stringify({
                title: fd.get('title'),
                description: fd.get('description'),
                file_id: fd.get('file_id') !== '' ? fd.get('file_id') : null,
                project_id: fd.get('project_id') ? fd.get('project_id') : null,
            }),
        })
        if (!res.ok) {
            const message = res.data?.detail
            throw new Error(message)
        }
        revalidateTag('tasks')

        return {
            status: 'ok',
            message: 'Заявка создана'
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

const closeTask = async (fd: FormData): Promise<ActionResponse> => {
    try {

        const res = await fetchService.patch(`report/${fd.get('id')}/close/`, {
        })
        if (!res.ok) {
            const message = res.data?.detail
            throw new Error(message)
        }
        revalidateTag('task/{id}')
        return {
            status: 'ok',
            message: 'Заявка закрыта'
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

const openTask = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.patch(`report/${fd.get('id')}/resume/`, {
        })
        if (!res.ok) {
            const message = res.data?.detail
            throw new Error(message)
        }
        revalidateTag('task/{id}')

        return {
            status: 'ok',
            message: 'Заявка возобновлена'
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

const getUserTask = async(id: string | number): Promise<Task> => {
    const res = await fetchService.get(`report/${id}/`, {
        next: {
            tags: ['task/{id}'],
        }
    })
    console.log(res)
    return res.data
}


export {
    createTask,
    getUserTask,
    closeTask,
    openTask
}