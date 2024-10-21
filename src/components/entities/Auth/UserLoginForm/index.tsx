'use client'
import PasswordField from '@/components/shared/Inputs/PasswordField'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC} from 'react'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";
import ImageBlock from "@/components/entities/Auth/ImageBlock";
import fetchService from "@/configs/http-service/fetch-settings";
import {cookies} from "next/headers";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";

type Props = {
    handleAuth: ((fd: FormData) => Promise<any>)
}


const UserLoginForm: FC<Props> = ({handleAuth}) => {
    const router = useRouter();

    const handleAuthClient = async (fd: FormData) => {
        'use client'
        try {
            const res = await fetch('http://152.42.132.41:5000/api/account/login/', {
                method: 'POST',
                body: JSON.stringify({
                    email: fd.get('email'),
                    password: fd.get('password')
                }),
                credentials: 'include',
                // source: 'client',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)
            // const {getCookie} = await import('cookies-next')
            // const token = getCookie('ai-tarot-id') ?? ''
            // await fetch('http://152.42.132.41:5000/api/configuration/', {
            //     credentials: 'include',  // Обязательно для отправки куков
            //     method: 'GET'
            // });
            // const check = await fetch('http://152.42.132.41:5000/api/configuration/', {
            //     method: 'GET',
            //     credentials: 'include',
            //     // headers: {
            //     //     'Cookie': `ai-tarot-id=${token}`,
            //     // },
            // })
            // console.log('CHECK CLIENT')
            // console.log(check)

            if (res.ok) {
                // const cookieValue = res.headers.get('Set-Cookie') || '';  // Provide a default empty string if null
                // setCookie('ai-tarot-id', cookieValue, {
                //     priority: 'high',
                //     sameSite: 'lax',
                //     httpOnly: true
                // });
                // router.replace('/')
                console.info('Login successful, tokens have been installed')
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


        // const res = await loginIntoAccount(fd)
        // if (res.status === 'ok') {
        //     redirect('/')
        // }
        // return res
    }

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper action={handleAuthClient}
                             infoUnderButton={
                                 <div className={'flex gap-1 text-center w-full items-center'}>
                                     <p className={'text-sm w-full text-[#BEBEBE] text-center'}>
                                         {'Don’t have an account? '}
                                         <Link href={'/auth/register'}
                                               className={'text-sm font-extrabold text-center text-[#27ACC9] hover:underline'}>
                                             Sign up
                                         </Link>
                                     </p>
                                 </div>
                             }
                             actionLabel={'Log in'}>
                    <input hidden value={'login'} name={'auth'}/>
                    <div className={'flex flex-col w-full gap-3 h-full '}>
                        <ImageBlock imageSrc={'/authImage.png'}>
                            <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
                                Nice to meet you 👋
                            </h1>
                        </ImageBlock>
                        <div className={'flex flex-col gap-2'}>
                            <TextField
                                size={'lg'}
                                label={'Email'}
                                className={'text-xl'}
                                placeholder={'Email address'}
                                name={'email'}
                                type={'email'}
                                required
                            />
                            <PasswordField
                                size={'lg'}
                                name={'password'}
                                label={'Password'}
                                placeholder={'Password'}
                                minLength={5}
                                required
                            />
                            <Link href={'/auth/reset-password'}
                                  className={'text-sm font-normal text-end text-gray-300 hover:underline'}>
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </FormWrapper>
            </div>
        </>
    )
}

export default UserLoginForm