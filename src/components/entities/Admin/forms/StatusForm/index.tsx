import TextField from "@/components/shared/Inputs/TextField";
import React from "react";
import {Status} from "@/lib/types/references/status.types";

const StatusForm = ({status}: { status: Status }) => {
    return (
        <div className={'space-y-2'}>
            <input hidden defaultValue={status.id} name={'id'}/>
            <TextField
                name={'external_title'}
                label={'Внешнее название'}
                isRequired
                defaultValue={status.external_title}/>
        </div>
    )
}

export default StatusForm
