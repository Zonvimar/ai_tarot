'use server'
import fetchService from "@/configs/http-service/fetch-settings";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {revalidateTag} from "next/cache";

const editCompanyProject = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.patch(`company/${fd.get('companyId')}/project/${fd.get('projectId')}/`, {
            body: JSON.stringify({
                responsible_id: fd.get('responsible_id') != '0' ? Number(fd.get('responsible_id')) : null,
            }),
        })
        if (!res.ok) {
            const message = res.data?.detail
            throw new Error(message)
        }
        revalidateTag('project/{id}')

        return {
            status: 'ok',
            message: 'Проект компании успешно изменен'
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

const setCompanyProjects = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.patch(`company/${fd.get('companyId')}/projects/`, {
            body: JSON.stringify({
                projects: JSON.parse(fd.get('projects') as string) ?? []
            }),
        })
        if (!res.ok) {
            const message = res.data?.detail
            throw new Error(message)
        }
        revalidateTag('project/{id}')
        return {
            status: 'ok',
            message: 'Проекты успешно выбраны'
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

const getAvailableProjects = async(): Promise<{id: number, title: string}[]> => {
    const res = await fetchService.get(`report/available_projects/`, {})
    return res.data
}


export {
    getAvailableProjects,
    // createDepartment,
    editCompanyProject,
    setCompanyProjects
    // deleteDepartment
}