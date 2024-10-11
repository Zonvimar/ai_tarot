'use client'
import React, {useState} from 'react'
import {Card, CardBody} from '@nextui-org/card'
import FormWrapper from "@/components/shared/FormWrapper";
import ModalComponent from "@/components/shared/ModalComponent";
import {editCompanyProject} from "@/lib/serverActions/admins/companies/projects";
import {CompanyProject} from "@/lib/types/references/project.types";
import CompanyProjectForm from "../forms/CompanyProjectForm";

const ProjectCard = ({project, company}: {project: CompanyProject, company: string | number}) => {
    const [open, setOpen] = useState(false)
    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
            withoutAction
            nonButtonTrigger={
                <Card shadow={'sm'} onClick={() => setOpen(true)} isPressable className={'rounded-md hover:shadow-warning-500 ' +
                    'hover:cursor-pointer flex-1 min-w-[300px] max-w-[500px]'}>
                    <CardBody className={'flex flex-col gap-3'}>
                        <div className={'flex flex-col text-start'}>
                            <p className={'line-clamp-1'}>
                                {project.title}
                            </p>
                            {/*<p className={'opacity-80 text-sm'}>({project.internal_title})</p>*/}
                        </div>
                        <div className={'flex flex-col text-start'}>
                            <p className={'line-clamp-1'}>
                                Ответственный: {project?.responsible?.name ? project?.responsible?.name : 'Не указан'}
                            </p>
                        </div>
                    </CardBody>
                </Card>
            }
            modalHeader={'Редактирование отдела'}
        >
            <FormWrapper action={editCompanyProject} modalControl={setOpen}>
                <div className={'space-y-2'}>
                    <CompanyProjectForm project={project} companyId={company}/>
                </div>
            </FormWrapper>
        </ModalComponent>
            
    )
}

export default ProjectCard