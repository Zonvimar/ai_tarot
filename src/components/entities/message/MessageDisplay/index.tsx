import React from 'react';
import MessageBubble from "@/components/entities/message/MessageBubble";
import MessageLoadingIndicator from "@/components/entities/message/MessageLoadingIndicator";

interface Message {
    message: string;
    isUser: boolean;
}

interface MessagesDisplayProps {
    messages: Message[];
    userName?: string;
    loading: boolean;
}

const MessagesDisplay: React.FC<MessagesDisplayProps> = ({ messages, userName, loading }) => (
    <div className="flex-grow overflow-y-auto max-h-[calc(100dvh-150px)] sm:max-h-[calc(100dvh-190px)]">
        <div className="flex flex-col w-full gap-6 h-full">
            <div className="text-medium sm:text-lg flex px-2 flex-col gap-2 items-start w-full max-w-[396px]">
                {messages.map((m, index) => (
                    <MessageBubble key={index} message={m.message} isUser={m.isUser} userName={userName} />
                ))}
            </div>
            {loading && <MessageLoadingIndicator />}
        </div>
    </div>
)

export default MessagesDisplay;
