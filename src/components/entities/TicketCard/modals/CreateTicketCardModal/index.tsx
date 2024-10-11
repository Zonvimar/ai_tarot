'use client'
import TicketForm from '../../TicketForm'
import FormWrapper from '@/components/shared/FormWrapper'
import ModalComponent from '@/components/shared/ModalComponent'
import { createTask } from '@/lib/serverActions/tasks'
import React from 'react'
import {User} from "@/lib/types/user.types";

const CreateTicketCardModal = ({buttonVariant, user}: {buttonVariant?: "link" | "default" | "secondary" | "ghost" | "destructive" | "outline" | "bordered", user: User}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
            label={'Создать заявку'}
            modalHeader={'Создать заявку'}
            actionLabel={'Отправить'}
            modalSize={'2xl'}
            isDismissable={false}
            buttonVariant={buttonVariant ? buttonVariant : 'default'}
        >
            <FormWrapper action={createTask} actionLabel={'Создать заявку'} modalControl={setOpen}>
                <div className={'space-y-2 px-1'}>
                    <TicketForm edit={false} user={user}/>
                </div>
            </FormWrapper>
        </ModalComponent>
    )
}

export default CreateTicketCardModal