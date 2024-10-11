'use client'
import {ColumnDef} from "@tanstack/table-core";
import {Users} from "@/lib/types/user.types";
import React from "react";
import IsVerifyTableCell from "@/components/shared/Table/TableCells/IsVerifyTableCell";

const usersColumns: ColumnDef<Users>[] = [
    {
        accessorKey: 'name',
        header: 'ФИО',
        cell: ({row}) => {
            const item = row.original
            return (
                // <div className={'flex gap-2 items-center w-fit'}>
                //     <Avatar className={''}>
                //         <AvatarImage
                //             src={item.avatar ? BASE_URL + 'image/get/' + item.avatar + '/?type=PREVIEW' : undefined}
                //         />
                //         <AvatarFallback>
                //             <UserIcon/>
                //         </AvatarFallback>
                //     </Avatar>
                    <p className={'line-clamp-2'}>{item.surname} {item.name} {item.middle_name}</p>
                // </div>
            )
        },
    },
    {
        accessorKey: 'email',
        header: 'Контакты',
        cell: ({row}) => {
            const {phone, email} = row.original
            return (
                <div>
                    <p><span className={'opacity-80 font-medium'}>Почта:</span> {email}</p>
                    <p><span className={'opacity-80 font-medium'}>Телефон:</span> {phone}</p>
                </div>
            )
        },
    },
    // {
    //     accessorKey: '_company',
    //     header: 'Компания',
    //     cell: ({row}) => {
    //         const {_company} = row.original
    //         return <p>{_company ? _company : 'Не выбрана'}</p>
    //     },
    // },
    {
        accessorKey: 'role',
        header: 'Роль',
        cell: ({row}) => {
            const {role} = row.original
            return <p>{role === 'ADMIN' ? 'Админ' : role === 'MANAGER' ? 'Менеджер' : 'Пользователь'}</p>
        },
    },
    {
        accessorKey: 'is_verified',
        header: 'Подтвержден',
        cell: ({row}) => {
            const {is_email_verified} = row.original
            return <IsVerifyTableCell checked={is_email_verified}/>
        },
    },
]

export default usersColumns