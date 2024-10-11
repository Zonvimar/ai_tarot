import {getUserTask} from '@/lib/serverActions/tasks'
import React, {FC} from 'react'
import {getTaskMessages} from "@/lib/serverActions/chat";
import ChatCard from "@/components/entities/Chat/ChatCard";
import TaskInfoCard from "@/components/entities/Chat/TaskInfoCard";
import {getUser, getUserInfo} from "@/lib/serverActions/user";

type Props = {
    params: {
        id: string
    }
}

const Page: FC<Props> = async({params}) => {
    const task = await getUserTask(params.id);
    const allMessages = await getTaskMessages(params.id);
    const myInfo = await getUserInfo();
    const userInfo = await getUser(task.created_by.id)
    return (
        <>
            <div className={'flex h-full w-full max-w-[1440px] mx-auto justify-center'}>
                <ChatCard allMessages={allMessages} task={task} params={params} user={myInfo}/>
                <TaskInfoCard task={task} userInfo={myInfo}/>
            </div>
        </>
    )
}

export default Page