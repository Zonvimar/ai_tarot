'use client'
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import Messages from "@/components/entities/Messages";
import React, {FC, useEffect, useRef, useState} from "react";
import {Message} from "@/lib/types/chat.types";
import AddMessageForm from "@/components/entities/Chat/AddMessageForm";
import {ChevronLeft, File, XIcon} from "lucide-react";
import {Task} from "@/lib/types/tasks.types";
import TaskInfoModal from "@/components/entities/Chat/TaskInfoModal";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {Button} from "@/components/base/button";
import {User} from "@/lib/types/user.types";
import WS_URL from "@/configs/http-service/constants/wsUrl";

type Props = {
    allMessages: Message[],
    task: Task,
    user: User,
    params: {
        id: string
    }
}

const ChatCard: FC<Props> = ({allMessages, task, params, user}) => {
    const router = useRouter();
    const [messages, setMessages] = useState(allMessages);
    const [open, setOpen] = useState(true)
    const [ws, setWs] = useState<WebSocket>();
    const element = useRef<HTMLDivElement>(null)
    const URL_WEB_SOCKET = `${WS_URL}/ws/report/messages/${params.id}/?Authorization=Bearer ${getCookie(TOKENS_KEYS.access)}`;
    const [file, setFile] = React.useState<File | null>(null)
    const [clearFileInput, setClearFileInput] = React.useState(false)

    useEffect(() => {
        if (element.current) {
            element.current.scrollTop = element.current.scrollHeight
        }
        setOpen(false)
    }, [open]);
    useEffect(() => {
        if (element.current) {
            element.current.scrollTop = element.current.scrollHeight
        }
    }, [messages.length, file]);

    useEffect(() => {
        const wsClient = new WebSocket(URL_WEB_SOCKET);
        wsClient.onopen = () => {
            setWs(wsClient);
            console.log('connected')
        };
        wsClient.onclose = () => console.log('ws closed');
        return () => {
            wsClient.close();
        };
    }, []);

    useEffect(() => {
        if (ws) {
            ws.onmessage = (evt: any) => {
                console.log(evt)
                const message = JSON.parse(evt.data);
                // console.log(message)
                // setMessages([...messages, message]);
                // const message = JSON.parse(evt.data);
                const newMessage: Message = {
                    id: message.id,
                    text: message.text,
                    created_at: message.createdAt,
                    created_by: message.createdBy,
                    file: message.file
                }
                setMessages([newMessage, ...messages]);
            };
        }
    }, [ws, messages]);

    return (
        <Card className={'w-full lg:rounded-r-none'}>
            <CardHeader className={'text-lg font-semibold py-1 px-0'}>
                <div className={'w-full justify-start gap-2 py-1 items-center hidden lg:flex'}>
                    <Button size={'default'} variant={'link'} onClick=
                        {() => {
                            router.back()
                            ws?.close()
                        }
                    }
                          className={'flex items-center text-sm text-primary'}><ChevronLeft/><p>Назад</p>
                    </Button>
                    <div className={'flex flex-col w-full justify-center text-center pr-10'}>
                        <span className={''}>Чат по заявке</span>
                    </div>
                </div>
                <div className={'w-full justify-between gap-2 items-center flex lg:hidden'}>
                    <Button size={'default'} variant={'link'} onClick=
                        {() => {
                            router.back()
                            ws?.close()
                        }
                        }
                            className={'flex items-center text-sm text-primary'}><ChevronLeft/><p>Назад</p>
                    </Button>
                    <TaskInfoModal task={task} userInfo={user}/>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody className={'bg-black flex flex-col p-0 m-0 overflow-y-hidden'}>
                <div ref={element} className={'p-2 transition-transform w-full h-full flex flex-col-reverse gap-2 bg-content2 overflow-y-scroll scroll-smooth'}>
                    <Messages messages={messages} user={user}/>
                </div>
                {file &&
                    <div className={'px-4 py-2 bg-content1 justify-center items-center'}>
                        <div className={'flex justify-between items-center'}>
                            <div className={'flex items-center gap-4'}>
                                <a href={URL.createObjectURL(file)} className={'flex items-center gap-4 text-primary hover:underline'} target={'_blank'}>
                                    <File strokeWidth={1.25} fontSize={22} size={'22'}/>
                                    <p className={'text-md'}>{file.name}</p>
                                </a>
                            </div>
                            <Button variant={'ghost'} size={'icon'} className={'bg-content1'} onClick={() => setClearFileInput(!clearFileInput)}>
                                <XIcon strokeWidth={1.25} size={'22'}/>
                            </Button>
                        </div>
                    </div>
                }
            </CardBody>
            <Divider/>
            <CardFooter className={'px-0 py-0 min-h-16 flex items-center justify-center'}>
                <AddMessageForm taskId={params.id} setFile={setFile} clearFileInput={clearFileInput}/>
            </CardFooter>
        </Card>
    )
}


export default ChatCard