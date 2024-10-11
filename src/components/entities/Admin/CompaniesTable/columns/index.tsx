'use client'
import {ColumnDef} from "@tanstack/table-core";
import React from "react";
import BooleanTableCell from "@/components/shared/Table/TableCells/BooleanTableCell";
import {Company} from "@/lib/types/references/companies.types";
import IsVerifyTableCell from "@/components/shared/Table/TableCells/IsVerifyTableCell";

const companiesColumns: ColumnDef<Company>[] = [
    {
        accessorKey: 'title',
        header: 'Название',
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({row}) => {
            const {email} = row.original
            return (
                <div className={'flex flex-col gap-0.5'}>
                    {/*<p className={'line-clamp-1'}>*/}
                    {email.length > 0 ? email?.map((e) => <p className={'line-clamp-1'}>{e.value}</p>) : ''}
                    {/*</p>*/}
                </div>
        )
        },
        },
    {
        accessorKey: 'phone',
        header: 'Телефон',
        cell: ({row}) => {
            const {phones} = row.original
            return (
                <div className={'flex flex-col gap-0.5'}>
                    {/*<p className={'line-clamp-1'}>*/}
                        {phones.length > 0 ? phones?.map((e) => <p className={'line-clamp-1'}>{e.value}</p>) : ''}
                    {/*</p>*/}
                </div>
            )
        },
    },
    {
        accessorKey: 'is_setup',
        header: 'Настроена',
        cell: ({row}) => {
            const {is_setup} = row.original
            return <IsVerifyTableCell checked={is_setup}/>
        },
    },
]

export default companiesColumns