import React from 'react'
import {Divider} from '@nextui-org/divider'
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card'
import {Task} from '@/lib/types/tasks.types'
import {Link} from "@nextui-org/link";
import {User} from "@/lib/types/user.types";
import {ClientDateTime} from "@/components/entities/TicketCard/ClientDateTime";

const TicketCard = async({task, user}: {task: Task, user: User}) => {
    const date = new Date(task.created_at).toLocaleString()
    const getInfoAboutCreator = async() => {
        if(user.role === 'ADMIN') {
            return (
                <div className={'flex flex-col items-end justify-end'}>
                    <span className={'opacity-60'}>{task?.created_by?.name ? task.created_by.name : 'Не указано'}</span>
                    {task?.company?.title ?
                        <span className={'opacity-60'}>{task.company.title}</span>
                        :
                        <span className={'opacity-60 text-warning '}>Нет компании</span>
                    }
                </div>
            )
        } else {
            return null
        }
    }
    return (
        <Link href={`/ticket/${task.id}`} className={"flex-1 min-w-[300px] max-w-[500px] items-stretch"}>
            <Card shadow={'sm'} isPressable className={'rounded-md hover:shadow-warning-500 ' +
                'hover:cursor-pointer flex-1 min-w-[300px]'}>
                <CardHeader className={'text-lg font-semibold py-1'}>
                    <div className={'flex w-full justify-between items-center'}>
                        <div className={'flex flex-col text-start'}>
                            <p className={'line-clamp-1'}>
                                {task ? task.title : 'Ticket title'}
                            </p>
                            {user.role === 'ADMIN' &&
                                <span className={'opacity-60 text-xs font-light'}>{task?.project?.title ? task.project.title : 'Не указано'}</span>
                            }
                        </div>
                        <div className={'flex gap-2 items-center'}>
                            {/*<div>*/}
                            {/*    <div style={{backgroundColor: `#${task.color}`}}*/}
                            {/*         className={`w-2 h-2 aspect-square rounded-full animate-pulse`}/>*/}
                            {/*</div>*/}
                            <p className={'text-sm'}>{task?.project?.title ? task.status.title : 'Не указано'}</p>
                        </div>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <p className={'text-md line-clamp-1 '}>
                        {task?.description ? task.description : ' '}
                    </p>
                </CardBody>
                <CardFooter className={'text-xs flex justify-between items-end'}>
                    <span className={'opacity-60'}><ClientDateTime date={new Date(task.created_at)}/></span>
                    {
                        getInfoAboutCreator()
                    }
                </CardFooter>
            </Card>
        </Link>

    )
}

export default TicketCard