'use client'
import FormWrapper from "@/components/shared/FormWrapper";
import {sendMessage} from "@/lib/serverActions/chat";
import React, { useEffect, useRef, useState} from "react";
import {PaperclipIcon, SendHorizonalIcon} from "lucide-react";
import TextField from "@/components/shared/Inputs/TextField";
import {Button} from "@nextui-org/react";
import fetchService from "@/configs/http-service/fetch-settings";

const AddMessageForm = ({taskId, setFile, clearFileInput}:
                            {taskId: string | number, setFile: React.Dispatch<React.SetStateAction<File | null>>, clearFileInput: boolean}) => {
    const ref = useRef<HTMLInputElement | null>(null)
    const [fileId, setFileId] = useState<number | undefined>(undefined)
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
                setFile(e.target?.files?.[0])
                setFileId(response.data?.id)
                return response.data?.id
            }
        }
    }


    const send = async (data: FormData) => {
        console.log(data);
        const res = await sendMessage(data)
        if(res.status === "ok") {
            setFile(null)
            if (ref.current) {
                ref.current.value = ''
                ref.current.files = null
            }
        }
        return res
    }

    useEffect(() => {
        if (ref.current) {
            if(ref.current.files?.[0]) {
                setFile(null)
                ref.current.files = null
                ref.current.value = ''
            } else {
                setFile(null)
            }
        }
    }, [clearFileInput]);

    return (
        <FormWrapper action={send} withoutPopover withOutDefaultButton clearAfterSubmit>
            <input type={"hidden"} name={"taskId"} value={taskId}/>
            <input type={"hidden"} name={"file"} value={fileId}/>
            <div className={'w-full h-full flex gap-2 justify-between items-center p-2 pt-2'}>
                <div className={'mx-2'}>
                    <input type={'file'} className={'opacity-0 hidden'} ref={ref}
                           onInput={onFileChange}/>
                    <PaperclipIcon size={'22'} strokeWidth={1.25} className={'cursor-pointer'}
                                   onClick={() => ref.current && ref.current.click()}
                    />
                </div>
                <TextField type={"text"} name={"text"} placeholder={'Сообщение...'} autoFocus={true} className={''}/>
                <Button type={'submit'} isIconOnly className={'h-fit py-1.5'}>
                    <SendHorizonalIcon size={'22'}/>
                </Button>
            </div>
        </FormWrapper>
    )
}

export default AddMessageForm