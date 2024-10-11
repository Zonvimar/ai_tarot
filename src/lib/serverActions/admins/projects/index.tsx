'use server'
import fetchService from "@/configs/http-service/fetch-settings";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {revalidateTag} from "next/cache";

const editProject = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.put(`project/${fd.get('id')}/`,{
            body: JSON.stringify({
                external_title: fd.get('external_title'),
                responsible_id: fd.get('responsible_id') != '0' ? Number(fd.get('responsible_id')) : null,
                default_status_id: Number(fd.get('default_status_id')),
                priority: Number(fd.get('priority')),
            })
        })

        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('projects')
            return {
                status: 'ok',
                message: 'Проект успешно изменен'
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
                message: 'Не удалось изменить проект'
            }
        }
    }
}

const getProjectEmployees = async(projectId: string | number): Promise<any[]> => {
    const res = await fetchService.get(`project/${projectId}/employees/`, {
        next: {
            tags: ['project/{id}'],
        }
    })
    console.log('employees!')
    console.log(res)
    return res.data
}

const getProjects = async(): Promise<any[]> => {
    const res = await fetchService.get(`project/`, {
        next: {
            tags: ['projects'],
        }
    })
    return res.data.results
}

export {
    editProject,
    getProjectEmployees,
    getProjects
}