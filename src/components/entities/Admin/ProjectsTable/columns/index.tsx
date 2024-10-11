'use client'
import {ColumnDef} from "@tanstack/table-core";
import {Project} from "@/lib/types/references/project.types";
import React from "react";
import ActionsTableColumns from "@/components/shared/Table/ActionsTableColumns";
import {editProject} from "@/lib/serverActions/admins/projects";
import EditProjectForm from "@/components/entities/Admin/forms/EditProjectForm";

const projectsColumns: ColumnDef<Project>[] = [
    {
        accessorKey: 'internal_title',
        header: 'Внутреннее название',
    },
    {
        accessorKey: 'external_title',
        header: 'Внешнее название',
    },
    {
        accessorKey: 'responsible',
        header: 'Ответственный',
        cell: ({row}) => {
            return row.original.responsible ? row.original.responsible.name : ''
        }
    },
    {
        accessorKey: 'default_status',
        header: 'Статус по умолчанию',
        cell: ({row}) => {
            return row.original.default_status ? row.original.default_status.title : ''
        }
    },
    {
        accessorKey: 'priority',
        header: 'Приоритет',
    },
    {
        header: 'Действия',
        accessorKey: 'actions',
        cell: ({row}) => {
            const item = row.original
            return (
                <ActionsTableColumns
                    editAction={editProject}
                    label={'Редактирование проекта'}
                    actionLabel={'Применить изменения'}
                >
                    <EditProjectForm project={item}/>
                </ActionsTableColumns>
            )
        },
    },
]

export default projectsColumns