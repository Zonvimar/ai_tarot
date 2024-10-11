import React, {FC} from 'react'
import {redirect} from "next/navigation";
import {confirmReset} from "@/lib/serverActions/auth";
import {Link} from "@nextui-org/link";
import {Image} from "@nextui-org/image";
import FormWrapper from "@/components/shared/FormWrapper";
import SubmitButton from "@/components/shared/Buttons/SubmitButton";
import VerifyEmailCodeForm from "@/components/entities/UserProfile/VerifyEmailCodeForm";


type Props = {
    searchParams: {
        email: string,
        resetPassword: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {
    const email = searchParams.email ?? 'failed'
    const resetPassword = !!searchParams.resetPassword


    const handleVerify = async (fd: FormData) => {
        'use server'
        console.log(fd.get('code'))
        const res = await confirmReset(fd)
        if (res.status === 'ok') {
            redirect('/')
        }
        return res
    }

    const handleCheck = async (fd: FormData) => {
        'use server'
        console.log(fd.get('code'))
        const res = await confirmReset(fd)
        if (res.status === 'ok') {
            redirect('/auth/new-password')
        }
        return res
    }


    return (
        <>
            {/*<div className={'flex flex-col justify-center gap-6 h-full'}>*/}
            {/*    <div className={'pt-10 w-full flex flex-col gap-2 justify-center text-center items-center'}>*/}
            {/*        <h1 className={'w-full text-center text-2xl font-bold'}>*/}
            {/*            {resetPassword ?*/}
            {/*                'Please check your email'*/}
            {/*                :*/}
            {/*                'Please verify your email'*/}
            {/*            }*/}
            {/*        </h1>*/}

            {/*        <p className={'px-4 text-sm font-normal'}>*/}
            {/*            I`ve sent a code to <span className={'font-bold'}>{email}</span>*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*    <div className={'grid place-items-start h-full'}>*/}
                    <VerifyEmailCodeForm
                        handleVerify={handleVerify}
                        handleCheck={handleCheck}
                        resetPassword={resetPassword}
                        email={email}
                    />
                    {/*<FormWrapper action={resetPassword ? handleCheck : handleVerify} withOutDefaultButton actionLabel={'Create account'}>*/}
                    {/*    <input hidden value={'register'} name={'auth'}/>*/}
                    {/*    <div className={'flex flex-col w-full gap-2 h-full justify-between'}>*/}
                    {/*        <div className={'flex flex-col gap-2'}>*/}
                    {/*            <VerifyEmailCodeForm/>*/}
                    {/*        </div>*/}
                    {/*        <div className={'flex flex-col w-full gap-2'}>*/}
                    {/*            <SubmitButton label={'Verify'}/>*/}

                    {/*            <div className={'flex gap-1 px-1 text-center w-full items-center'}>*/}
                    {/*                <p className={'text-medium font-bold w-full text-[#27ACC9] text-center'}>*/}
                    {/*                    Send code again*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</FormWrapper>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Page