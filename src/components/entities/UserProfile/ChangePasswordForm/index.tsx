'use client'
import React from 'react'
import PasswordField from "@/components/shared/Inputs/PasswordField";

const ChangePasswordForm = () => {
    return (
        <>
            <PasswordField label={'Старый пароль'} name={'old_password'} type={'password'} isRequired/>
            <PasswordField label={'Новый пароль'} name={'new_password'} type={'password'} isRequired/>
            <PasswordField label={'Повторите пароль'} name={'new_password_repeat'} type={'password'} isRequired/>
        </>
    )
}

export default ChangePasswordForm