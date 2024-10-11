'use client'
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar";
import React from "react";
import {Task} from "@/lib/types/tasks.types";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {CrossCircledIcon, DotsVerticalIcon, PlayIcon} from "@radix-ui/react-icons";
import FormWrapper from "@/components/shared/FormWrapper";
import {closeTask, openTask} from "@/lib/serverActions/tasks";
import BASE_URL from "@/configs/http-service/constants/baseUrl";
import {User} from "@/lib/types/user.types";
import {ClientDateTime} from "@/components/entities/TicketCard/ClientDateTime";


const TaskInfoCard = ({task, userInfo}: { task: Task, userInfo: User }) => {

    return (
        <div className={'w-[40%] hidden lg:block h-full'}>
            <Card className={'h-full p-2 rounded-l-none'}>
                <CardHeader className={'text-lg font-semibold flex justify-between'}>
                    <p>Информация о заявке</p>
                </CardHeader>
                <CardBody className={'flex flex-col gap-4'}>
                    <div className={'flex flex-col gap-0.5'}>
                            <span className={'text-sm opacity-60'}>
                                Статус
                            </span>
                        <div className={'flex gap-1 items-center justify-between'}>
                            <p className={'text-md'}>{task?.status?.title ? task.status.title : "Не указан"}</p>
                            {/*<div>*/}
                            {/*    <div className={`w-3 aspect-square bg-[#${task.color}] rounded-full animate-pulse`}/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className={'flex gap-2 items-center justify-between'}>
                        <div className={'flex flex-col gap-0.5'}>
                            <span className={'text-sm opacity-60'}>
                                {userInfo.role === 'USER' ?
                                    'Над вашей заявкой работает'
                                    :
                                    'Создатель заявки'
                                }
                            </span>
                            <div className={'flex gap-1 items-center justify-between'}>
                                <p className={'text-md'}>
                                    {userInfo.role === 'USER' ?
                                        task?.responsible?.name ? task.responsible.name : "Не указан"
                                        :
                                        task?.created_by?.name ? task?.created_by?.name : 'Не указан'
                                    }
                                </p>
                            </div>
                        </div>
                        <div>
                            <Avatar
                                isBordered
                                className={"transition-transform"}
                                // name="Jason Hughes"
                                size="lg"
                                src={userInfo.role === 'USER' ?
                                    task?.responsible?.avatar ? task.responsible.avatar : undefined
                                    :
                                    task?.created_by?.avatar ? BASE_URL + 'image/get/' + task.created_by?.avatar + '/?type=FULL' : undefined
                                }
                            />
                        </div>
                    </div>
                    <div className={''}>
                        <span className={'opacity-60 text-sm'}>
                            Дата подачи
                        </span>
                        <p className={'text-md'}>
                            <ClientDateTime date={new Date(task.created_at)}/>
                        </p>
                    </div>
                    <div className={''}>
                            <span className={'text-sm opacity-60'}>
                                Название
                            </span>
                        <p className={'text-md '}>
                            {task.title}
                        </p>
                    </div>
                    {task.description &&
                        <div className={'flex flex-col gap-0.5'}>
                                <span className={'text-sm opacity-60'}>
                                Описание
                                </span>
                            <p className={'text-md'}>
                                {task.description}
                            </p>
                        </div>
                    }
                </CardBody>
                <CardFooter className={'text-sm flex justify-between items-center'}>
                    {task.is_active ?
                        <FormWrapper action={closeTask} withOutDefaultButton disablePaddings>
                            <input type={'hidden'} name={'id'} defaultValue={task.id}/>
                            <Button type={'submit'} variant={'ghost'} className={'flex gap-2'} color={'danger'}>
                                <CrossCircledIcon/>
                                <p>Завершить заявку</p>
                            </Button>
                        </FormWrapper>
                        :
                        <FormWrapper action={openTask} withOutDefaultButton disablePaddings>
                            <input type={'hidden'} name={'id'} defaultValue={task.id}/>
                            <Button type={'submit'} variant={'ghost'} className={'flex gap-2'} color={'success'}>
                                <PlayIcon/>
                                <p>Возобновить заявку</p>
                            </Button>
                        </FormWrapper>
                    }

                </CardFooter>
            </Card>
        </div>

    )
}

export default TaskInfoCard