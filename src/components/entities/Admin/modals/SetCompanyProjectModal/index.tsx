'use client'
import FormWrapper from '@/components/shared/FormWrapper'
import ModalComponent from '@/components/shared/ModalComponent'
import React from 'react'
import {setCompanyProjects} from "@/lib/serverActions/admins/companies/projects";
import SetCompanyProjectForm from "@/components/entities/Admin/forms/SetCompanyProjectForm";
import {CompanyProject} from "@/lib/types/references/project.types";

const SetCompanyProjectModal = ({company, projects}: { company: string | number, projects: CompanyProject[]}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
            label={'Выбрать проекты'}
            modalHeader={'Выбрать проекты'}
            // actionLabel={'Отправить'}
            // buttonVariant={buttonVariant ? buttonVariant : 'default'}
        >
            <FormWrapper action={setCompanyProjects} actionLabel={'Применить'} modalControl={setOpen}>
                <div className={'space-y-2'}>
                    <input hidden defaultValue={company} name={'companyId'}/>
                    <SetCompanyProjectForm companyId={company} projects={projects}/>
                </div>
            </FormWrapper>

        </ModalComponent>
    )
}

export default SetCompanyProjectModal