'use client'
import React, {FC, useRef} from 'react'
import {toast} from 'sonner'
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import SubmitButton from "@/components/shared/Buttons/SubmitButton";

type CustomFormProps = {
    children: React.ReactNode
    action: (fd: FormData) => Promise<ActionResponse>,
    modalControl?: React.Dispatch<React.SetStateAction<boolean>>,
    setInvalid?: React.Dispatch<React.SetStateAction<boolean>>,
    readonly actionLabel?: string,
    withOutDefaultButton?: boolean,
    disablePaddings?: boolean,
    withoutPopover?: boolean,
    clearAfterSubmit?: boolean,
    customButton?: React.ReactNode,
    infoUnderButton?: React.ReactNode | boolean
} & React.ComponentProps<'form'>

const FormWrapper: FC<CustomFormProps> = ({
                                              withoutPopover = false,
                                              children,
                                              modalControl,
                                              actionLabel = 'Сохранить',
                                              action,
                                              withOutDefaultButton = false,
                                              disablePaddings = false,
                                              clearAfterSubmit = false,
                                              setInvalid,
                                              infoUnderButton,
                                              customButton,
                                          }) => {

    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (fd: FormData) => {
        const actionResponse = await action(fd)
        console.log('FORM SUBMISSION RESULTS:', actionResponse)
        const {status, message} = actionResponse !== undefined ? actionResponse : {status: 'ok', message: ''}
        switch (status) {
            case 'ok':
                const DEFAULT_MESSAGE
                    = 'Изменения сохранены'
                if(!withoutPopover) {
                    toast.success(message ?? DEFAULT_MESSAGE)
                }
                modalControl && modalControl(false)
                clearAfterSubmit && formRef?.current?.reset()
                break
            case 'error':
                const DEFAULT_ERROR_MESSAGE
                    = 'Что-то пошло не так, попробуйте еще раз, либо обратитесь в поддержку'
                // if(!withoutPopover) {
                //     toast.error(message ?? DEFAULT_ERROR_MESSAGE)
                    setInvalid && setInvalid(true)
                // }
                break
        }
        return
    }

    return (
        <form
            action={handleSubmit}
            className={`flex flex-col min-h-[calc(100dvh-50px)] h-full justify-center gap-2 w-full`}
            onClick={e => e.stopPropagation()}
            ref={formRef}
        >
            <div className={`flex-grow overflow-y-auto ${infoUnderButton ? 'max-h-[calc(100dvh-152px)] sm:max-h-[calc(100dvh-162px)]' : 'max-h-[calc(100dvh-117px)] sm:max-h-[calc(100dvh-137px)]'}`}>
                {children}
            </div>
            {
                !withOutDefaultButton &&
                    <div className="flex-shrink-0 flex justify-center flex-col gap-2 w-full ifems-center">
                        <SubmitButton label={actionLabel}/>
                        {infoUnderButton && infoUnderButton}

                    </div>
            }
            {
                customButton &&
                    <div className="flex-shrink-0 flex justify-center flex-col gap-2 w-full ifems-center">
                        {customButton}
                    </div>
            }
        </form>
    )
}

export default FormWrapper