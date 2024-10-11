'use client'
import {Badge} from '@nextui-org/badge'
import {
    Button,
    Pagination
} from '@nextui-org/react'
import React, {useEffect, useState} from 'react'
import {BellIcon} from "lucide-react";
import {Notifications} from "@/lib/types/user.types";
import {getCookie} from "cookies-next";
import {TOKENS_KEYS} from "@/configs/http-service/constants/authTokens";
import FormWrapper from "@/components/shared/FormWrapper";
import {viewNotification} from "@/lib/serverActions/user";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import fetchService from "@/configs/http-service/fetch-settings";
import {useRouter} from "next/navigation";
import {getLocalTimeZone} from "@internationalized/date";
import {ClientDateTime} from "@/components/entities/TicketCard/ClientDateTime";
import WS_URL from "@/configs/http-service/constants/wsUrl";


const NotificationWidget = ({userId}: {userId: string | number}) => {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notifications[]>([])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)
    const totalPages = Math.ceil(count / 10)
    const [ws, setWs] = useState<WebSocket>();
    const [unseenNotify, setUnseenNotify] = useState(null)
    const URL_WEB_SOCKET = `${WS_URL}/ws/notification/count/?Authorization=Bearer ${getCookie(TOKENS_KEYS.access)}`;
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const timeZone = getLocalTimeZone()
    const audio = new Audio('/notification-sound.mp3')


    useEffect(() => {
        const getNotifications = async(userId: string | number, page: string | number) => {
            const res = await fetchService.get('notification/', {
                params: {
                    page_size: 10,
                    page: page,
                },
                next: {
                    tags: ['user-notify'],
                },
                source: 'client',
            })
            console.log('notifications')
            if (res.ok) {
                setCount(res.data.count)
                setNotifications(res.data.results)
            }
        }
        getNotifications(userId, page)
    }, [page, unseenNotify]);

    useEffect(() => {
        const connectWS = () => {
            const wsClient = new WebSocket(URL_WEB_SOCKET);
            wsClient.onopen = () => {
                setWs(wsClient);
                console.log('connected')
            };
            wsClient.onmessage = (evt: any) => {
                console.log(evt)
                const unseenCount = JSON.parse(evt.data);
                setUnseenNotify(unseenCount)
                if (unseenNotify && unseenCount > unseenNotify) {
                    audio.play()
                }
                console.log(unseenCount)
            };
            wsClient.onclose = () => console.log('ws closed');
            return () => {
                wsClient.close();
            };
        }
        connectWS()
    }, []);

    useEffect(() => {
        if (ws) {
            ws.onmessage = (evt: any) => {
                console.log(evt)
                const unseenCount = JSON.parse(evt.data);
                setUnseenNotify(unseenCount)
                if (unseenNotify && unseenCount > unseenNotify) {
                    audio.play()
                }
                console.log(unseenCount)
            };
        }
    }, [ws, notifications]);

    const getLink = (notification: Notifications) => {
        switch(notification.type) {
            case 'REPORT':
                return `/ticket/${notification.referenced_object_id}/`
            case 'USER':
                return `/administration/users/${notification.referenced_object_id}/`
            case 'COMPANY':
                return `/administration/companies/${notification.referenced_object_id}/`
            case 'PROJECT':
                return `/administration/projects/`
            case 'STATUS':
                return `/administration/statuses/`
            case 'NONE':
                return ''
            default:
                return `/ticket/${notification.referenced_object_id}/`
        }
    }


    const handleClick = async (fd: FormData) => {
        setLoading(true)
        const res = await viewNotification(fd)
        if (res.status === 'ok') {
            if (fd.get('redirectLink') !== '') {
                router.push(fd.get('redirectLink') as string)
            }
            setIsOpen(false)
        }
        setLoading(false)
        return res
    }


    return (
        <Popover isOpen={isOpen} placement={'bottom-end'} onOpenChange={(open) => setIsOpen(open)} className={'min-w-[300px] flex justify-center max-w-screen w-fit'} color={'default'} radius={'md'} backdrop={'blur'}>
            {!unseenNotify ?
                <PopoverTrigger>
                    <Button variant="bordered" isIconOnly>
                        <BellIcon strokeWidth={1.25} width={18}/>
                    </Button>
                </PopoverTrigger>
                :
                <Badge content={unseenNotify} color="warning">
                    <PopoverTrigger>
                        <Button variant="bordered" isIconOnly>
                            <BellIcon strokeWidth={1.25} width={18}/>
                        </Button>
                    </PopoverTrigger>
                </Badge>
            }
            <PopoverContent className={'p-2'} >
                {notifications.length > 0 ?
                    <div>
                        {notifications.map((notification) => (
                            <div key={notification.id} className={'px-0 py-0 m-0'}>
                                <FormWrapper action={handleClick} withOutDefaultButton withoutPopover disablePaddings>
                                    <input type={'hidden'} name={'id'} value={notification.id}/>
                                    <input type={'hidden'} name={'redirectLink'} defaultValue={getLink(notification)}/>
                                    <Button type={'submit'} variant={'ghost'} isLoading={loading}
                                            className={'rounded border-0 min-w-[300px] max-w-[400px] w-full h-full py-2 px-2'}>
                                        <div className={'w-full flex flex-col'}>
                                            <div className={'flex justify-between items-center gap-1'}>
                                                <p className={'text-xs opacity-60'}>{notification.title}</p>
                                                <p className={'text-xs opacity-60'}>
                                                    <ClientDateTime date={new Date(notification.created_at)}/>
                                                </p>
                                            </div>
                                            <div className={'flex gap-1.5 items-center'}>
                                                {!notification.is_read &&
                                                    <div>
                                                        <div
                                                            className={`w-3 h-3 aspect-square bg-warning rounded-full`}/>
                                                    </div>
                                                }
                                                <p className={'text-md line-clamp-1'}>{notification.text}</p>

                                            </div>
                                        </div>
                                    </Button>
                                </FormWrapper>
                            </div>
                        ))}
                        {totalPages > 1 &&
                            <div className={'px-0 pt-2 m-0 flex justify-center items-center'}>
                                <Pagination total={totalPages} color={"warning"} showControls page={page + 1} onChange={(page) => setPage(page - 1)}/>
                                {/*<div className={'flex gap-2 items-center justify-end'}>*/}
                                {/*    <FormWrapper action={viewAllNotification} withOutDefaultButton withoutPopover disablePaddings>*/}
                                {/*        <input type={'hidden'} name={'id'} value={'all'}/>*/}
                                {/*        <Button type={'submit'} className={'rounded border-0 w-full h-full py-2 px-2'}>*/}
                                {/*            Прочитать все уведомления*/}
                                {/*         </Button>*/}
                                {/*     </FormWrapper>*/}
                                {/* </div>*/}
                            </div>
                        }
                    </div>

                    :
                    <div className={'p-1 text-md text-center opacity-60'}>
                        <p>Нет уведомлений</p>
                    </div>
                }

            </PopoverContent>
        </Popover>
    )
}

export default NotificationWidget