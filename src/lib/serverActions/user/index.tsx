'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ActionResponse} from '@/configs/http-service/fetch-settings/types'
import {User} from '../../types/user.types'
import { revalidateTag } from 'next/cache'
import {z} from "zod";

const editProfile = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.put(`user/`, {
            body: JSON.stringify(Object.fromEntries(fd)),
        })

        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('user-profile')
            return {
                status: 'ok',
                message: 'Профиль успешно изменен'
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
                message: 'Не удалось изменить ваши данные'
            }
        }
    }
}

const PasswordSchema = z.object({
    new_password_repeat: z.string().min(1),
    new_password: z.string().min(1),
    old_password: z.string().min(1),
}).superRefine(({new_password_repeat, new_password}, ctx) => {
    if (new_password !== new_password_repeat) {
        ctx.addIssue({
            code: 'custom',
            message: 'Пароли не совпадают',
        })
    }
})

const changePassword = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const data = PasswordSchema.parse({
            old_password: fd.get('old_password'),
            new_password: fd.get('new_password'),
            new_password_repeat: fd.get('new_password_repeat'),
        })

        const response = await fetchService.patch(`user/password/`, {
            body: JSON.stringify(data)
        })

        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('user-profile')
            return {
                status: 'ok',
                message: 'Пароль успешно изменен'
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
                message: 'Не удалось изменить пароль'
            }
        }
    }
}

const getUserInfo = async(): Promise<User> => {
    const res = await fetchService.get('user/', {
        next: {
            tags: ['user-profile'],
        }
    })
    return res.data
}

const getMyProfile = async(): Promise<User> => {
    const res = await fetchService.get('user/', {
        next: {
            tags: ['user-profile'],
        }
    })
    return res.data
}

const viewNotification = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.patch(`notification/${fd.get('id')}/mark_read/`)
        if (!res.ok) {
            const message = res.data?.detail
            throw new Error(message)
        }

    } catch (e) {
        if (e instanceof Error) {
            return {
                status: 'error',
                message: e.message,
            }
        }
        return {
            status: 'error',
            message: 'Что-то пошло не так, попробуйте еще раз',
        }
    }
    // const link = fd.get('redirectLink') as string
    revalidateTag('user-notify')
    // redirect(link)
    return {
        status: 'ok',
        message: 'Успешно'
    }
}

const getUser = async(id: string | number): Promise<User> => {
    const res = await fetchService.get(`user/${id}/info/`, {
        next: {
            tags: [`user/{id}`],
        }
    })
    console.log(res)
    return res.data
}

export {
    getUserInfo,
    editProfile,
    changePassword,
    getUser,
    viewNotification,
    getMyProfile
}