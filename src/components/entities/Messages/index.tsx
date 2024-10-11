'use client'
import {Message} from "@/lib/types/chat.types";
import UserMessage from "@/components/entities/Messages/UserMessage";
import AdminMessage from "@/components/entities/Messages/AdminMessage";
import {User} from "@/lib/types/user.types";

const Messages = ({messages, user}: {messages: Message[], user: User}) => {
    if (!messages.length)
        return (
            <div className={'w-full h-full flex items-center justify-center'}>
                <p className={'text-lg text-center py-1 px-2 bg-black opacity-60 text-white rounded-md'}>Нет сообщений</p>
            </div>
        )
    return (
        <>
            {messages.map((message) => (
                message.created_by.id === user.id
                    ?
                    <UserMessage key={message.id} message={message}/>
                    :
                    <AdminMessage key={message.id} message={message}/>
            ))}
        </>
    )
}

export default Messages;