'use server'
import fetchService from "@/configs/http-service/fetch-settings";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {revalidateTag} from "next/cache";

const editStatus = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.put(`project_status/${fd.get('id')}/`,{
            body: JSON.stringify({
                external_title: fd.get('external_title'),
            })
        })

        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('project/{id}')
            return {
                status: 'ok',
                message: 'Статус успешно изменен'
            }
        }
    } catch (e) {
        if(e instanceof Error) {
            return {
                status: 'error',
                message: e.message
            }
        } else {
            return {
                status: 'error',
                message: 'Не удалось изменить статус'
            }
        }
    }
}

const getProjectStatuses = async(projectId: string | number): Promise<any[]> => {
    const res = await fetchService.get(`project/${projectId}/statuses/`, {
        next: {
            tags: ['project/{id}'],
        }
    })
    return res.data
}


export {
    getProjectStatuses,
    editStatus,
}