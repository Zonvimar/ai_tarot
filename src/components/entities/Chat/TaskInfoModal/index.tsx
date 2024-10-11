'use client'
import ModalComponent from "@/components/shared/ModalComponent";
import {Task} from "@/lib/types/tasks.types";
import React, {useState} from "react";
import {Avatar} from "@nextui-org/avatar";
import BASE_URL from "@/configs/http-service/constants/baseUrl";
import {User} from "@/lib/types/user.types";
import {ClientDateTime} from "@/components/entities/TicketCard/ClientDateTime";


const TaskInfoModal = ({task, userInfo}: {task: Task, userInfo: User}) => {
    const [open, setOpen] = useState(false)

    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
            withoutAction={false}
            nonActionTrigger={
                <div className={'w-full flex gap-2 text-sm justify-between items-center'}>
                    <span className={'opacity-60'}>
                                Дата создания:
                            </span>
                    <span className={'opacity-60'}>
                        <ClientDateTime date={new Date(task.created_at)}/>
                    </span>
                </div>
            }
            nonButtonTrigger={
                <div className={'flex gap-2 w-full items-center'} onClick={() => setOpen(true)}>
                    <div className={'flex flex-col w-full justify-center text-center px-10'}>
                        <p className={'line-clamp-1'}>{task.title}</p>
                        <span className={'opacity-60 text-sm font-light pr-2'}>Чат по заявке</span>
                    </div>
                    <div className={'flex justify-end w-fit pr-2'}>
                        <Avatar
                            color={'primary'}
                            className={"transition-transform"}
                            size="md"
                            src={userInfo.role === 'USER' ?
                                task?.responsible?.avatar ? task.responsible.avatar : undefined
                                :
                                task?.created_by?.avatar ? BASE_URL + 'image/get/' + task.created_by?.avatar + '/?type=FULL' : undefined
                            }
                        />
                    </div>
                </div>
            }
            label={'О заявке'}
            modalHeader={'Информация о заявке'}
            actionLabel={'Отправить'}

        >
            <>
                <div className={'flex flex-col gap-0.5'}>
                            <span className={'text-sm opacity-60'}>
                                Статус
                            </span>
                    <div className={'flex gap-1 items-center justify-between'}>
                        <p className={'text-md'}>{task?.status?.title ? task.status.title : "В работе"}</p>
                        {/*<div>*/}
                        {/*    <div className={`w-3 aspect-square bg-[#${task.color}] rounded-full animate-pulse`}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className={'flex gap-2 items-center justify-between'}>
                    <div className={'flex flex-col gap-0.5'}>
                            <span className={'text-sm opacity-60'}>
                                Над вашей заявкой работает
                            </span>
                        <div className={'flex gap-1 items-center justify-between'}>
                            <p className={'text-md'}>
                                {task?.responsible?.name}
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
                            <span className={'text-sm opacity-60'}>
                                Название
                            </span>
                    <p className={'text-md'}>
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

            </>
        </ModalComponent>
    )
}

export default TaskInfoModal;