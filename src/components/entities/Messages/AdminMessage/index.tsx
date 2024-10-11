import React from "react";
import {Message} from "@/lib/types/chat.types";
import {Tooltip} from "@nextui-org/tooltip";
import {FileIcon} from "@radix-ui/react-icons";
import BASE_URL from "@/configs/http-service/constants/baseUrl";
import {getCookie} from "cookies-next";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import {getLocalTimeZone} from "@internationalized/date";
import {ClientDateTime} from "@/components/entities/TicketCard/ClientDateTime";
import PhotoModal from "@/components/entities/Messages/Modals/PhotoModal";

const AdminMessage = ({message}: {message: Message}) => {
    const timeZone = getLocalTimeZone()
    const extension = message.file ? message?.file?.name.slice(-4) : ''

    return (
        <div className={'left-0 mr-auto max-w-[55%] bg-content1 rounded-xl'} key={`admin-message-${message.id}`}>
            <p className={'opacity-60 text-sm pt-0.5 px-2 flex'}>
                {message.created_by.name}
            </p>
            {message.file !== null ?
                extension === '.jpg' || extension === '.png' || extension === 'jpeg'
                    ?
                    <PhotoModal photo={BASE_URL + 'file/get/' + message?.file?.id + `/?Authorization=Bearer ${getCookie(TOKENS_KEYS.access)}`} rounded={false}/>
                    :
                    <Tooltip content={'Нажмите, чтобы скачать файл'}>
                        <a href={BASE_URL + 'file/get/' + message?.file?.id + `/?Authorization=Bearer ${getCookie(TOKENS_KEYS.access)}`} target={'_blank'} className={'cursor-pointer text-white flex px-2 pt-2 gap-2 items-center justify-center'}>
                            <FileIcon className={'w-6 h-6'}/>
                            <p className={'flex justify-center text-md'}>
                                {message.file?.name}
                            </p>
                        </a>
                    </Tooltip>
                :
                <></>
            }
            <p className={'text-md px-2'}>
                {message.text}
            </p>
            <p className={'opacity-60 text-xs pt-0.5 pb-2 px-2 flex justify-end'}>
                <ClientDateTime date={new Date(message.created_at)}/>
            </p>
        </div>
    )
}

export default AdminMessage