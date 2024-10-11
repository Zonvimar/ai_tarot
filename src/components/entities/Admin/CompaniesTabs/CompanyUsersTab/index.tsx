import {Users} from "@/lib/types/user.types";
import React from "react";
import {Card, CardBody} from "@nextui-org/card";
import {Link} from "@nextui-org/link";
import {CheckIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";


const CompanyUsersTab = ({users}: { users: Users[] }) => {
    return (
        <div className={'w-full flex flex-wrap gap-3 items-stretch mx-auto max-w-[1440px] justify-start max-gap-4 my-2'}>
            {users?.map((user: Users) => (
                <Link href={`/administration/users/${user.id}`} className={"min-w-[350px] w-full"}>
                    <Card className={'w-full min-w-[350px] h-fit'}>
                        <CardBody className={'space-y-2'}>
                            <div className={'flex justify-between gap-1'}>
                                <p>{user?.name}</p>
                                {user.is_email_verified ?
                                    <div className={'text-sm flex gap-2 items-center text-success'}>
                                        <CheckIcon/>
                                        <p>Подтвержден</p>
                                    </div>
                                    :
                                    <div className={'text-sm flex gap-2 items-center text-warning'}>
                                        <ExclamationTriangleIcon/>
                                        <p>Не подтвержден</p>
                                    </div>
                                }
                            </div>
                            <p>{user?.role}</p>
                            <div className={'opacity-70 text-sm flex flex-col gap-1'}>
                                <p>{user?.email}</p>
                                <p>{user?.phone}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Link>
                ))}
        </div>

    )
}

export default CompanyUsersTab