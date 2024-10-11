'use client'
import React, {FC} from "react";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {Pencil1Icon} from "@radix-ui/react-icons";
import FormWrapper from "@/components/shared/FormWrapper";
import ModalComponent from "@/components/shared/ModalComponent";

type Props = {
    children: React.ReactNode,
    editAction: (fd: FormData) => Promise<ActionResponse>,
    label: string,
    actionLabel?: string
}

const ActionsTableColumns: FC<Props> = ({actionLabel, editAction, label, children}) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className={'flex gap-1 justify-center items-center'}>
            <ModalComponent
                isIcon
                modalSize={'sm'}
                icon={<Pencil1Icon/>}
                modalHeader={label}
                setOpen={setOpen}
                open={open}
            >
                <FormWrapper action={editAction}
                             actionLabel={actionLabel ? actionLabel : 'Применить изменения'} modalControl={setOpen}>
                    {children}
                </FormWrapper>
            </ModalComponent>
        </div>
    )
}

export default ActionsTableColumns;