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
                        <div className={'w-full flex flex-col gap-2 justify-center text-center items-center'}>
                            <Image src={'/img.png'} alt={'logo'} width={200} height={200}/>
                            <h1 className={'w-full text-center text-2xl font-bold'}>
                                Nice to meet you 👋
                            </h1>
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