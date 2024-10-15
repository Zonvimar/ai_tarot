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


const MainPageForm: FC<Props> = ({handleAuth}) => {

    return (
        <>
            <div className={'grid place-items-start h-full'}>
                <FormWrapper action={handleAuth}
                             actionLabel={'Get a Tarot reading'}>
                    <input hidden value={'login'} name={'auth'}/>
                    <div className={'flex flex-col w-full gap-6 h-full '}>
                        <ImageBlock imageSrc={'/authImage.png'}>
                            <h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>
                                Nice to meet you 👋
                            </h1>
                        </ImageBlock>
                    </div>
                </FormWrapper>
            </div>
        </>
    )
}

export default MainPageForm