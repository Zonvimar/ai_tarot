'use client'
import PasswordField from '@/components/shared/Inputs/PasswordField'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC} from 'react'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";
import ImageBlock from "@/components/entities/Auth/ImageBlock";

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