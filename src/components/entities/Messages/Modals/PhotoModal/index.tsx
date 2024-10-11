'use client'
import ModalComponent from '@/components/shared/ModalComponent'
import React, {FC, useState} from 'react'
import {Tooltip} from "@nextui-org/tooltip";

type Props = {
    photo?: string,
    rounded?: boolean,
}

const PhotoModal: FC<Props> = ({photo, rounded}) => {
    const [open, setOpen] = useState(false)
    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
            nonButtonTrigger={
                <Tooltip closeDelay={300} className={'max-w-[300px]'} content={'Нажмите на изображение, чтобы открыть его на полный экран'}>
                    <img src={photo} className={`max-h-[170px] object-cover hover:cursor-pointer ${rounded ? 'rounded-t-xl' : ''}`}
                         alt={'photo'} onClick={() => setOpen(true)}/>
                </Tooltip>
                // <Button variant={'link'} className={'text-white text-sm'} onClick={() => setOpen(true)}>
                //     Изображение
                // </Button>
            }
            withoutModalHeader
            withoutAction
            modalSize={'full'}
        >
            <img src={photo} className={'max-h-[85vh] object-contain'} alt={'photo'}/>

        </ModalComponent>
    )
}

export default PhotoModal