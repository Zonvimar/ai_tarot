'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ActionResponse} from '@/configs/http-service/fetch-settings/types'
import { revalidateTag } from 'next/cache'


const editUserInfo = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.put(`user/${fd.get('id')}/info/`, {
            body: JSON.stringify({
                name: fd.get('name'),
                surname: fd.get('surname'),
                middle_name: fd.get('middle_name'),
                email: fd.get('email'),
                phone: fd.get('phone'),
                avatar: fd.get('avatar') !== '' ? fd.get('avatar') : null
            }),
        })

        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('user/{id}')
            return {
                status: 'ok',
                message: 'Профиль пользователя успешно изменен'
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
                message: 'Не удалось изменить данные пользователя'
            }
        }
    }
}

const setCRMtoUser = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.patch(`user/${fd.get('id')}/crm_contact/`, {
            body: JSON.stringify({
                crm_contact_id: fd.get('crm_contact_id'),
            })
        })

        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('user/{id}')
            return {
                status: 'ok',
                message: 'Пользователь успешно привязан к Битриксу'
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
                message: 'Не удалось привязать'
            }
        }
    }
}

const createBitrixUser = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.patch(`user/${fd.get('id')}/create_crm_contact/`)
        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('user/{id}')
            return {
                status: 'ok',
                message: 'Контакт в битрикс успешно создан и привязан к пользователю'
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
                message: 'Не удалось создать контакт'
            }
        }
    }
}

const verifyUser = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.patch(`user/${fd.get('id')}/verify_email/`, {})
        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('users')
            return {
                status: 'ok',
                message: 'Пользователь успешно подтвержден'
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
                message: 'Не удалось подтвердить пользователя'
            }
        }
    }
}

const blockUser = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.patch(`user/${fd.get('id')}/block/`, {})
        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('users')
            return {
                status: 'ok',
                message: 'Пользователь заблокирован'
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
                message: 'Не удалось заблокировать пользователя'
            }
        }
    }
}

const unblockUser = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.patch(`user/${fd.get('id')}/unblock/`, {})
        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('users')
            return {
                status: 'ok',
                message: 'Пользователь разблокирован'
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
                message: 'Не удалось разблокировать пользователя'
            }
        }
    }
}

const addCompanyUser = async(fd: FormData): Promise<ActionResponse> => {
    try {

        const response = await fetchService.patch(`user/${fd.get('id')}/company/`, {
            body: JSON.stringify({
                company_id: fd.get('company')
            }),
        })
        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            revalidateTag('user/{id}')
            return {
                status: 'ok',
                message: 'Пользователь успешно привязан к компании'
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
                message: 'Не удалось привязать пользователя к компании'
            }
        }
    }
}
//
// const getContactsCRM = async(companyId: string | number): Promise<any[]> => {
//     const res = await fetchService.get(`references/companies/${companyId}/get_employees/`, {
//         next: {
//             tags: ['contacts'],
//         }
//     })
//     console.log(res)
//     return res.data
// }


export {
    setCRMtoUser,
    addCompanyUser,
    editUserInfo,
    createBitrixUser,
    verifyUser,
    blockUser,
    unblockUser
}