'use client'
import {ColumnDef} from "@tanstack/table-core";
import {Status} from "@/lib/types/references/status.types";
import ActionsTableColumns from "@/components/shared/Table/ActionsTableColumns";
import React from "react";
import StatusForm from "@/components/entities/Admin/forms/StatusForm";
import {editStatus} from "@/lib/serverActions/admins/statuses";

const statusesColumns: ColumnDef<Status>[] = [
    {
        accessorKey: 'internal_title',
        header: 'Внутреннее название',
    },
    {
        accessorKey: 'external_title',
        header: 'Внешнее название',
    },
    {
        accessorKey: 'project',
        header: 'Проект',
        cell: ({row}) => {
            return row.original.project_title
        },
    },
    {
        header: 'Действия',
        // accessorKey: 'actions',
        cell: ({row}) => {
            const item = row.original
            return (
                <ActionsTableColumns
                    editAction={editStatus}
                    label={'Редактирование статуса'}
                    actionLabel={'Применить изменения'}
                >
                    <StatusForm status={item}/>
                </ActionsTableColumns>
            )
        },
    },
]

export default statusesColumns