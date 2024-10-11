import {Project} from "@/lib/types/references/project.types";
import TextField from "@/components/shared/Inputs/TextField";
import AsyncSelectorField2 from "@/components/shared/Selectors/TestSelector";
import {getProjectEmployees} from "@/lib/serverActions/admins/projects";
import React from "react";
import {getProjectStatuses} from "@/lib/serverActions/admins/statuses";


const EditProjectForm = ({project}: { project: Project }) => {
    return (
        <div className={'space-y-2'}>
            <input hidden defaultValue={project.id} name={'id'}/>
            <TextField
                name={'external_title'}
                label={'Внешнее название'}
                isRequired
                defaultValue={project.external_title}
            />
            <TextField
                name={'priority'}
                label={'Приоритет'}
                isRequired
                inputMode={'numeric'}
                defaultValue={project.priority.toString()}
            />
            <AsyncSelectorField2
                name={'responsible_id'}
                // required={true}
                size={'sm'}
                label={'Ответственный'}
                initOptions={{value: project?.responsible?.id, label: project?.responsible?.name}}
                fetchFn={() => getProjectEmployees(project.id)}
                optionKey={'name'}
            />
            <AsyncSelectorField2
                name={'default_status_id'}
                required={true}
                size={'sm'}
                optionKey={'internal_title'}
                label={'Статус по умолчанию'}
                initOptions={{value: project?.default_status?.id , label: project?.default_status?.title}}
                fetchFn={() => getProjectStatuses(project.id)}
            />
            {/*<Checkbox defaultSelected={project.is_default} name={'default'}>По умолчанию</Checkbox>*/}
        </div>
    )
}

export default EditProjectForm
