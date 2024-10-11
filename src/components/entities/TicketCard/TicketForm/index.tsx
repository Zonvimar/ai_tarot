'use client'
import { Task } from '@/lib/types/tasks.types'
import React, {useEffect, useRef, useState} from 'react'
import {Input, Textarea} from "@nextui-org/input";
import {UploadIcon} from "lucide-react";
import fetchService from "@/configs/http-service/fetch-settings";
import BASE_URL from "@/configs/http-service/constants/baseUrl";
import {User} from "@/lib/types/user.types";
import AsyncSelectorField2 from "@/components/shared/Selectors/TestSelector";
import {getAvailableProjects} from "@/lib/serverActions/admins/companies/projects";

const TicketForm = ({task, edit, user}: {task?: Task, edit: boolean, user: User}) => {
    const ref = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = React.useState<string | undefined>(BASE_URL + 'file/get/' + task?.file?.id + '/')
    const [fileId, setFileId] = useState<number | undefined>(task?.file?.id)
    const [fileName, setFileName] = React.useState<string | undefined>(task?.file?.name)

    const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            console.log('fd')
            console.log(formData.get('file'))
            const response = await fetchService.post(`file/save/`, {
                body: formData,
                headers: {},
                source: 'client',
            })
            if (response.ok) {
                setFileId(response.data?.id)
                setFileName(e.target.files[0].name)
                setFile(BASE_URL + 'file/get/' + response.data?.id + '/')
                return response.data?.id
            }
        }
    }

    return (
        <>
            {edit && <input type={'hidden'} name={'id'} value={task?.id}/>}
            <Input type={'text'} label={'Название'} className={'rounded-3xl'} required name={'title'} isRequired defaultValue={task?.title} />
            <Textarea label={'Описание'} name={'description'} isRequired required defaultValue={task?.description} />
            {user.is_company_assigned &&
                <AsyncSelectorField2 label={'Отдел'} selectDefaultOptionFirst={true}
                                     required={true} size={'sm'} name={'project_id'}
                                     fetchFn={getAvailableProjects} optionKey={'title'}
                />
            }
            <div className={''}>
                <input className={'opacity-0 hidden'} ref={ref} type={'file'}
                       onInput={onFileChange}/>
                <input hidden value={fileId} name={'file_id'}/>
                <div onClick={() => ref.current && ref.current.click()} className={'flex w-full gap-2 items-center' +
                    ' bg-content2 px-2 py-4 rounded-md text-sm cursor-pointer hover:bg-content3 transition'}>
                    <UploadIcon size={'16'}/>
                    <p className={''}>{fileName || 'Загрузить файл'}</p>
                </div>
            </div>
        </>
    )
}

export default TicketForm