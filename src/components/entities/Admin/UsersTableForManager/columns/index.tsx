'use client'
import {ColumnDef} from "@tanstack/table-core";
import {Users} from "@/lib/types/user.types";
import React from "react";

const usersManagerColumns: ColumnDef<Users>[] = [
    {
        accessorKey: 'first_name',
        header: 'ФИО',
        cell: ({row}) => {
            const item = row.original
            return (
                <div className={'flex gap-2 items-center w-fit'}>
                    {/*<Avatar className={''}>*/}
                    {/*    <AvatarImage src={item.avatar_url && BASE_URL + item.avatar_url.slice(1)}/>*/}
                    {/*    <AvatarFallback>*/}
                    {/*        <UserIcon/>*/}
                    {/*    </AvatarFallback>*/}
                    {/*</Avatar>*/}
                    <p className={'line-clamp-2'}>{item.surname} {item.name} {item.middle_name}</p>
                </div>
            )
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Телефон',
    },
]

export default usersManagerColumns