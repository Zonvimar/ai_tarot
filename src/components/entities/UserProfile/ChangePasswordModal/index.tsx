'use client'
import FormWrapper from '@/components/shared/FormWrapper'
import ModalComponent from '@/components/shared/ModalComponent'
import {changePassword} from '@/lib/serverActions/user'
import React, {useState} from 'react'
import ChangePasswordForm from "@/components/entities/UserProfile/ChangePasswordForm";
import {Link} from "@nextui-org/link";


const ChangePasswordModal = () => {
    const [open, setOpen] = useState(false)
    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
            withoutAction
            nonButtonTrigger={
                <Link onClick={() => setOpen(true)} color={'primary'} href={'#'}>
                    <p className={'hover:underline'}>Сменить пароль</p>
                </Link>
            }
            modalHeader={'Сменить пароль'}
        >
            <FormWrapper action={changePassword} modalControl={setOpen}>
                <div className={'space-y-2'}>
                    <ChangePasswordForm/>
                </div>
            </FormWrapper>
        </ModalComponent>
    )
}

export default ChangePasswordModal