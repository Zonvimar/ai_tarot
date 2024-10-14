'use client'
import PasswordField from '@/components/shared/Inputs/PasswordField'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC} from 'react'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {Image} from "@nextui-org/image";
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";

type Props = {
    handleAuth: ((fd: FormData) => Promise<ActionResponse>)
}


const UserLoginForm: FC<Props> = ({handleAuth}) => {

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper action={handleAuth}
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
                    <div className={'flex flex-col w-full gap-6 h-full '}>
                        <div className={'w-full flex flex-col gap-6 justify-center items-center text-center'}>
                            <div className={'flex-col gap-2 hidden sm:flex'}>
                                <p className={'text-xl sm:text-3xl font-semibold'}>Aita, ai tarologist</p>
                                <div className={'w-full flex gap-1 text-[#BEBEBE] items-center justify-center text-center text-xs sm:text-medium  font-normal'}>
                                    <div className={'bg-[#14B411] rounded-full w-2 h-2'}></div>
                                    Always online to help you find answers
                                </div>
                            </div>
                            <Image
                                src={'/img.png'}
                                alt={'logo'}
                                width={325}
                                height={325}
                                // removeWrapper
                                classNames={{
                                    img: [
                                        'backdrop-blur-xs',
                                    ],
                                    wrapper: [
                                        'rounded-full shadow-[#22879D] shadow-[0_0_25px_1px_rgba(0,0,0,0.3)] mt-4 sm:mt-0 bg-opacity-55 bg-[#22879D]'
                                    ]
                                }}

                                style={{
                                    width: '50vw',  // Используем относительную ширину в зависимости от ширины окна
                                    maxWidth: '325px',  // Ограничиваем максимальную ширину
                                    height: 'auto',  // Автоматическая высота для сохранения пропорций
                                    transition: 'width 0.5s ease-in-out',  // Плавная анимация изменения ширины
                                }}
                            />
                            <div className={'flex flex-col gap-2'}>
                                <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
                                    Nice to meet you 👋
                                </h1>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <TextField size={'lg'} label={'Email'} className={'text-xl'}
                                       placeholder={'Email address'} name={'email'}
                                       type={'email'} isRequired/>
                            <PasswordField size={'lg'} name={'password'} label={'Password'} placeholder={'Password'}
                                           minLength={5}
                                           isRequired/>
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