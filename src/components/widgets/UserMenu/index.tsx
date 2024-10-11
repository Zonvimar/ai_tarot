'use client'
// import UserProfileModal from '@/components/entities/UserProfile/UserProfileModal'
import { User } from '@/lib/types/user.types'
import React from 'react'
import {usePathname} from "next/navigation";
import LeaveButton from "@/components/shared/Buttons/LeaveButton";
import {BookOpenText} from "lucide-react";
import Link from "next/link";

const UserMenu = ({user}: {user: User}) => {
    const pathname = usePathname()
    return (
        <div className={'px-1 pb-1 p-0 flex flex-col gap-1'}>
            <div className={'flex flex-col gap-2 p-2'}>
                <Link href={'/guide'}
                      className={`p-2 transition-background items-center ${pathname.includes('/guide') && 'bg-content3'} flex rounded-md justify-between hover:bg-content2`}>
                    <p>Инструкция</p>
                    <BookOpenText />
                </Link>
            </div>
            {/*<UserProfileModal user={user}/>*/}
            <LeaveButton/>
        </div>

    )
}

export default UserMenu