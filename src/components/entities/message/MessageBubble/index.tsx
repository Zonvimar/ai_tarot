import React from 'react';
import { Avatar } from '@nextui-org/react';

interface MessageBubbleProps {
    message: string;
    isUser: boolean;
    userName?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser, userName }) => (
    <div className={`w-full flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-2`}>
        {isUser ? (
            <>
                <p className="text-medium font-semibold">{userName}</p>
                <div className="px-4 py-3 bg-[#27ACC9] max-w-[80vw] rounded-tl-2xl rounded-b-3xl">
                    <p>{message}</p>
                </div>
            </>
        ) : (
            <>
                <div className="flex gap-2 items-center text-medium font-semibold">
                    <Avatar isBordered src="/avatar.png" className="w-6 h-6 ring-[#27ACC9]" />
                    <p>Aita</p>
                </div>
                <div className="px-4 py-3 bg-[#343434] max-w-[80vw] rounded-tr-2xl rounded-b-3xl">
                    <p>{message}</p>
                </div>
            </>
        )}
    </div>
);

export default MessageBubble;
