'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ActionResponse} from '@/configs/http-service/fetch-settings/types'
import { ConfigurationType } from '@/lib/types/config.types';



const checkAuth = async(): Promise<ConfigurationType> => {
    const res = await fetchService.get(`api/configuration/`)
    return res.data
}


const checkEmailExists = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.get(`api/account/exists/${fd.get('email')}`)
        if(!!res.data) {
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
    return {
        status: 'ok',
        message: ''
    }

}


const loginIntoAccount = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.post('api/account/login/', {
            body: JSON.stringify({
                email: fd.get('email'),
                password: fd.get('password')
            })
        })
        if (res.ok) {
            console.info('Login successful, tokens have been installed')
        } else {
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
    return {
        status: 'ok',
        message: 'Аутентификация успешна'
    }
}

const registerAccount = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.post('api/account/register/', {
            body: JSON.stringify({
                username: fd.get('username'),
                email: fd.get('email'),
                password: fd.get('password'),
                dateOfBirth: fd.get('dateOfBirth'),
                gender: fd.get('gender'),
            }),
        })

        console.log('RESPONSE')
        console.log(response)

        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            return {
                status: 'ok',
                message: 'Вы успешно зарегестрировались'
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
                message: 'Не удалось создать аккаунт'
            }
        }
    }
}

const successResponse = async (): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: ''
    }
}

const resetPassword = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.post('authentication/reset_password/', {
            body: JSON.stringify({
                email: fd.get('email'),
            })
        })
        if(!response.ok) {
            const message = response.data.detail
            throw new Error(message)
        } else {
            return {
                status: 'ok',
                message: 'Письмо отправлено на вашу почту'
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
                message: 'Не удалось отправить письмо'
            }
        }
    }
}

const confirmReset = async (fd: FormData): Promise<ActionResponse> => {
    return {
        status: 'ok',
        message: 'Вы успешно сменили свой пароль'
    }
}

const approveEmail = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.put(`api/account/confirm-email?confirmationCode=${fd.get('code')}`)
        if(!res.ok) {
            const message = res.data.detail
            throw new Error(message)
        } else {
            return {
                status: 'ok',
                message: 'Вы успешно подтвердили вашу почту'
            }
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
}

export {
    checkAuth,
    checkEmailExists,
    loginIntoAccount,
    registerAccount,
    resetPassword,
    approveEmail,
    successResponse,
    confirmReset
}