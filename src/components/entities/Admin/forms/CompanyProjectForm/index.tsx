import AsyncSelectorField2 from "@/components/shared/Selectors/TestSelector";
import React from "react";
import {CompanyProject} from "@/lib/types/references/project.types";
import {getProjectEmployees} from "@/lib/serverActions/admins/projects";

const CompanyProjectForm = ({project, companyId}: { project: CompanyProject, companyId: string | number }) => {
    return (
        <div className={'space-y-2'}>
            <input hidden defaultValue={project?.id} name={'projectId'}/>
            <input hidden defaultValue={companyId} name={'companyId'}/>
            <AsyncSelectorField2
                name={'responsible_id'}
                size={'sm'}
                label={'Ответственный'}
                initOptions={project.responsible ? {value: project.responsible?.id, label: project.responsible?.name} : undefined}
                fetchFn={() => getProjectEmployees(project.id)}
                optionKey={'name'}
            />
        </div>
    )
}

export default CompanyProjectForm

