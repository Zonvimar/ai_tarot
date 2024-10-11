import React, {FC} from 'react'
import {redirect} from "next/navigation";
import {confirmReset} from "@/lib/serverActions/auth";
import ResetPasswordForm from "@/components/entities/Auth/ResetPasswordForm";



type Props = {
    searchParams: {
        code: string,
        email: string,
    }
}

const Page: FC<Props> = async({searchParams}) => {

    const handleReset = async (fd: FormData) => {
        'use server'
        const res = await confirmReset(fd)
        // if (res.status === 'ok') {
            redirect(`/auth/approve-email?email=${fd.get('email')}&resetPassword=true`)
        // }
        return res
    }

    return (
        <>
            <ResetPasswordForm
                handleReset={handleReset}
            />
        </>

        // <div className={'flex flex-col justify-center gap-4 h-full'}>
        //     <div className={'w-full flex flex-col gap-2 justify-center text-center items-center'}>
        //         <Image src={'/img.png'} alt={'logo'} width={200} height={200}/>
        //         <h1 className={'text-2xl font-bold'}>
        //             Don’t worry, let’s get it back 😉
        //         </h1>
        //         <p className={'px-4 text-medium font-normal'}>
        //             Please enter the email associated with your account and i’ll send a code.
        //         </p>
        //     </div>
        //     <div className={'grid place-items-start h-full'}>
        //         <FormWrapper action={handleReset} withOutDefaultButton actionLabel={'Log in'}>
        //             <input hidden value={'login'} name={'auth'}/>
        //             <div className={'flex flex-col w-full h-full justify-between'}>
        //                 <div className={'flex flex-col gap-2'}>
        //                     <ResetPasswordForm/>
        //                 </div>
        //                 <div className={'flex flex-col w-full gap-2'}>
        //                     <SubmitButton label={'Send code'}/>
        //                     <div className={'flex gap-1 text-center w-full items-center'}>
        //                         <p className={'text-sm w-full text-[#BEBEBE] text-center'}>
        //                             Please contact the help@aitarot.io if you forgot an email
        //                         </p>
        //                     </div>
        //                 </div>
        //
        //             </div>
        //
        //         </FormWrapper>
        //     </div>
        // </div>
    )
}

export default Page