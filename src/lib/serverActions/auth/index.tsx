'use server'
import fetchService from '@/configs/http-service/fetch-settings'
import {ActionResponse} from '@/configs/http-service/fetch-settings/types'
import {cookies} from "next/headers";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";


const loginIntoAccount = async (fd: FormData): Promise<ActionResponse> => {
    try {
        const res = await fetchService.post('authentication/by_email/', {
            body: JSON.stringify({
                email: fd.get('email'),
                password: fd.get('password')
            })
        })
        if (res.ok) {
            cookies().set(TOKENS_KEYS.access, res.data.token, {
                priority: 'high',
                sameSite: 'lax',
            })
            cookies().set(TOKENS_KEYS.refresh, res.data.token, {
                priority: 'high',
                sameSite: 'lax',
            })
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
    // try {
    //     const response = await fetchService.post('registration/web/', {
    //         body: JSON.stringify({
    //             company_title: fd.get('company_title'),
    //             name: fd.get('name'),
    //             surname: fd.get('surname'),
    //             middle_name: fd.get('middle_name'),
    //             password: fd.get('password'),
    //             email: fd.get('email'),
    //             phone: fd.get('phone'),
    //             avatar: fd.get('avatar')
    //         }),
    //     })
    //
    //     if(!response.ok) {
    //         const message = response.data.detail
    //         throw new Error(message)
    //     } else {
    //         cookies().set(TOKENS_KEYS.access, response.data.token, {
    //             priority: 'high',
    //             sameSite: 'lax',
    //         })
    //         cookies().set(TOKENS_KEYS.refresh, response.data.token, {
    //             priority: 'high',
    //             sameSite: 'lax',
    //         })
    //         console.info('Login successful, tokens have been installed')
    //         return {
    //             status: 'ok',
    //             message: 'Вы успешно зарегестрировались'
    //         }
    //     }
    //
    // } catch (e) {
    //     if(e instanceof Error) {
    //         return {
    //             status: 'error',
    //             message: e.message
    //         }
    //     } else {
    //         return {
    //             status: 'error',
    //             message: 'Не удалось создать аккаунт'
    //         }
    //     }
    // }
    return {
        status: 'ok',
        message: 'Вы успешно зарегестрировались'
    }
}

//TODO cookies
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
    // try {
    //     const response = await fetchService.post('authentication/reset_password/confirm/', {
    //         body: JSON.stringify({
    //             email: fd.get('email'),
    //             code: fd.get('code'),
    //             password: fd.get('password'),
    //         })
    //     })
    //     if(!response.ok) {
    //         const message = response.data.detail
    //         throw new Error(message)
    //     } else {
            return {
                status: 'ok',
                message: 'Вы успешно сменили свой пароль'
            }
    //     }
    //
    // } catch (e) {
    //     if(e instanceof Error) {
    //         return {
    //             status: 'error',
    //             message: e.message
    //         }
    //     } else {
    //         return {
    //             status: 'error',
    //             message: 'Не удалось сменить пароль'
    //         }
    //     }
    // }
}

const sendVerifyEmail = async(fd: FormData): Promise<ActionResponse> => {
    try {
        const response = await fetchService.post('email/send/')

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

const approveEmail = async (code: string): Promise<ActionResponse> => {
    try {
        const res = await fetchService.post(`email/verify/`, {
            body: JSON.stringify({
                code: code,
            })
        })
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
    loginIntoAccount,
    registerAccount,
    resetPassword,
    sendVerifyEmail,
    approveEmail,
    confirmReset
}