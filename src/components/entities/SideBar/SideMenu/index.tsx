'use client'
import {User} from "@/lib/types/user.types";
import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";
import React from "react";
import {BarChartHorizontal, Building2, FolderKanban, UsersRound} from "lucide-react";
import {Accordion, AccordionItem, Selection} from "@nextui-org/react";
import {searchParamsToUrlQuery} from "next/dist/shared/lib/router/utils/querystring";

const SideMenu = ({user}: {user: User }) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1", "2"]));
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = searchParamsToUrlQuery(searchParams)

    const handleSelect = (keys: Selection) => {
        setSelectedKeys(new Set([keys.toString()]));
    };

    if (user.role === 'MANAGER' || user.role === 'ADMIN') {
        return (
            <Accordion
                defaultSelectedKeys={selectedKeys}
                onSelectionChange={handleSelect}
                selectionMode={'multiple'}
            >
                 <AccordionItem key='1' aria-label="Заявки" title="Заявки">
                     <div className={'flex flex-col gap-1'}>
                        <Link href={'/?status=ACTIVE'}
                              className={`p-2 transition-background items-center ${params.status === 'ACTIVE' && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                            Активные заявки
                            <div className={`w-3 h-3 aspect-square bg-green-500 rounded-full`}/>
                        </Link>
                        <Link href={'/?status=FINISHED'}
                              className={`p-2 transition-background items-center flex ${params.status === 'FINISHED' && 'bg-content3'} rounded-md justify-between hover:bg-content2`}>
                            Завершенные заявки
                            <div className={`w-3 h-3 aspect-square bg-gray-500 rounded-full`}/>
                        </Link>
                         <Link href={'/'}
                              className={`p-2 transition-background items-center ${!params.status && pathname === '/' && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                            <p>Все заявки</p>
                        </Link>
                    </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Администрирование" title="Администрирование">
                    {user.role === 'MANAGER' &&
                        <Link href={'/administration/users'}
                              className={`p-2 transition-background items-center ${pathname.includes('/users') && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                            <p>Сотрудники</p>
                            <UsersRound/>
                        </Link>
                    }
                    {user.role === 'ADMIN' &&
                        <div className={'flex flex-col gap-1 w-full'}>
                            <Link href={'/administration/users'}
                                  className={`p-2 transition-background items-center ${pathname.includes('/users') && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                                <p>Пользователи</p>
                                <UsersRound/>
                            </Link>
                            <Link href={'/administration/companies'}
                                  className={`p-2 transition-background items-center ${pathname.includes('/companies') && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                                <p>Компании</p>
                                <Building2 />
                            </Link>
                            <Link href={'/administration/projects'}
                                  className={`p-2 transition-background items-center ${pathname.includes('/projects') && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                                <p>Проекты</p>
                                <FolderKanban />
                            </Link>
                            <Link href={'/administration/statuses'}
                                  className={`p-2 transition-background items-center ${pathname.includes('/statuses') && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                                <p>Статусы</p>
                                <BarChartHorizontal />
                            </Link>
                        </div>
                    }
                </AccordionItem>
            </Accordion>
        )
    } else {
        return (
            <Accordion
                defaultSelectedKeys={selectedKeys}
                onSelectionChange={handleSelect}
                selectionMode={'multiple'}
            >
                <AccordionItem key='1' aria-label="Заявки" title="Заявки">
                    <div className={'flex flex-col gap-1'}>
                        <Link href={'/?status=ACTIVE'}
                              className={`p-2 transition-background items-center ${params.status === 'ACTIVE' && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                            Активные заявки
                            <div className={`w-3 h-3 aspect-square bg-green-500 rounded-full`}/>
                        </Link>
                        <Link href={'/?status=FINISHED'}
                              className={`p-2 transition-background items-center flex ${params.status === 'FINISHED' && 'bg-content3'} rounded-md justify-between hover:bg-content2`}>
                            Завершенные заявки
                            <div className={`w-3 h-3 aspect-square bg-gray-500 rounded-full`}/>
                        </Link>
                        <Link href={'/'}
                              className={`p-2 transition-background items-center ${!params.status && pathname === '/' && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                            <p>Все заявки</p>
                        </Link>
                    </div>
                </AccordionItem>
            </Accordion>
        )
    }
}

export default SideMenu