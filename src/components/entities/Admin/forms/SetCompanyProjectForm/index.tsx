import MultipleSelector from "@/components/shared/Selectors/MultiSelectorFIeld";
import React from "react";
import {CompanyProject} from "@/lib/types/references/project.types";
import {getProjects} from "@/lib/serverActions/admins/projects";


const SetCompanyProjectForm = ({companyId, projects}: {companyId: string | number, projects: CompanyProject[]}) => {
    console.log('projects')
    console.log(projects)
    return (
        <div className={'space-y-2'}>
            <MultipleSelector
                name={'projects'}
                size={'sm'}
                label={'Проекты'}
                optionKey={'internal_title'}
                initOptions={projects ? [...projects?.map(project => ({id: project.id, label: project.title}))] : []}
                fetchFn={getProjects}
            />
        </div>
    )
}

export default SetCompanyProjectForm;