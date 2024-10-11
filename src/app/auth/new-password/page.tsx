import {loginIntoAccount, registerAccount} from '@/lib/serverActions/auth'
import React, {FC} from 'react'
import {redirect} from "next/navigation";
import NewPasswordForm from "@/components/entities/Auth/NewPasswordForm";

type Props = {
    searchParams: {
        [key: string]: string
    }
}

const Page: FC<Props> = ({searchParams}) => {
    const handleResetPassword = async (fd: FormData) => {
        'use server'
        const res = await loginIntoAccount(fd)
        // if (res.status === 'ok') {
            redirect('/')
        // }
        return res
    }
    return (
        <>
            <NewPasswordForm
                handleResetPassword={handleResetPassword}
            />
        </>
        // <div className={'flex flex-col justify-center gap-4 h-full'}>
        //     {/*<AppNavbar/>*/}
        //     <div className={'w-full flex flex-col gap-2 justify-center text-center items-center'}>
        //         <Image src={'/img.png'} alt={'logo'} width={200} height={200}/>
        //         <h1 className={'w-full text-center text-2xl font-bold'}>
        //             Create new password
        //         </h1>
        //     </div>
        //     <div className={'grid place-items-start h-full'}>
        //         <FormWrapper action={handleAuth} withOutDefaultButton actionLabel={'Log in'}>
        //             <input hidden value={'login'} name={'auth'}/>
        //             <div className={'flex flex-col w-full h-full justify-between'}>
        //                 <div className={'flex flex-col gap-2'}>
        //                     <NewPasswordForm/>
        //                 </div>
        //                 <div className={'flex flex-col w-full gap-2'}>
        //                     <SubmitButton label={'Reset password'}/>
        //                 </div>
        //             </div>
        //
        //         </FormWrapper>
        //     </div>
        // </div>
    )
}

export default Page