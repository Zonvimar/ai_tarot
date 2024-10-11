'use client'
import {ColumnDef} from "@tanstack/table-core";
import {Task} from "@/lib/types/tasks.types";
import React from "react";
import BooleanTableCell from "@/components/shared/Table/TableCells/BooleanTableCell";
import {ClientDateTime} from "@/components/entities/TicketCard/ClientDateTime";

const ticketColumns: ColumnDef<Task>[] = [
    {
        accessorKey: 'responsible',
        header: 'Ответственный',
        cell: ({row}) => {
            const item = row.original
            return (
                <div className={'flex gap-2 items-center w-fit'}>
                    <p className={'line-clamp-2'}>{item?.responsible?.name ? item.responsible.name : 'Не указано'}</p>
                </div>
            )
        },
    },
    {
        accessorKey: 'status',
        header: 'Статус',
        cell: ({row}) => {
            const item = row.original
            return (
                <div className={'flex gap-2 items-center justify-between'}>
                    <p className={'text-sm'}>{item?.status?.title ? item.status.title : 'Не указано'}</p>
                </div>
            )
        }
    },
    {
        accessorKey: 'title',
        header: 'Название',
    },
    {
        accessorKey: 'project',
        header: 'Проект',
        cell: ({row}) => {
            const {project} = row.original
            return (
                project?.title
            )
        }
    },
    {
        accessorKey: 'creator',
        header: 'Создатель',
        cell: ({row}) => {
            const item = row.original
            return (
                <p className={''}>{item?.created_by?.name ? item.created_by?.name : 'Не указано'}</p>
            )
        }
    },
    {
        accessorKey: 'created_at',
        header: 'Дата создания',
        cell: ({row}) => {
            const {created_at} = row.original
            return (
                <p className={''}><ClientDateTime date={new Date(created_at)}/></p>
            )
        }
    },
    {
        accessorKey: 'is_active',
        header: 'Активная',
        cell: ({row}) => {
            const {is_active} = row.original
            return (
                <BooleanTableCell checked={is_active}/>
            )
        }
    },
]

export default ticketColumns