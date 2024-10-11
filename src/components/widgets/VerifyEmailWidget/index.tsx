'use client'
import ModalComponent from "@/components/shared/ModalComponent";
import {User} from "@/lib/types/user.types";
import {useState} from "react";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Button} from "@nextui-org/react";
import FormWrapper from "@/components/shared/FormWrapper";
import {sendVerifyEmail} from "@/lib/serverActions/auth";


const VerifyEmailWidget = ({user}: {user: User}) => {
    const [open, setOpen] = useState(false)
    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
            modalHeader={'Подтвердите электронную почту'}
            nonButtonTrigger={
                <Button variant={'bordered'} color={'warning'} onClick={() => setOpen(!open)} className={'text-warning'}>
                    <ExclamationTriangleIcon/>
                    <p>Подтвердите почту</p>
                </Button>
            }
        >
            <>
                <div className={'flex flex-col gap-2'}>
                    <p>На вашу почту <span className={'font-bold'}>{user.email}</span> было выслано письмо с ссылкой для подтверждения почты</p>
                </div>
                <FormWrapper action={sendVerifyEmail} actionLabel={'Выслать письмо повторно'}>
                    <p className={'font-bold pb-2'}>В случае если вы не видите письмо, проверьте папку со спамом</p>
                    <p>Если нигде не обнаружили письмо, нажмите на кнопку ниже, мы отправим вам повторное письмо</p>
                    <input type="hidden" name="email" value={user.email}/>
                    <input type="hidden" name="id" value={user.id}/>
                </FormWrapper>
            </>

        </ModalComponent>

    )
}

export default VerifyEmailWidget;