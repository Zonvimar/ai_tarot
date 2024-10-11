'use client'
import UserProfileForm from "@/components/entities/UserProfile/UserProfileForm";
import FormWrapper from "@/components/shared/FormWrapper";
import React, {useState} from "react";
import {CardBody, Card, CardHeader} from "@nextui-org/card";
import {User} from "@/lib/types/user.types";
import {editUserInfo, verifyUser, blockUser, unblockUser} from "@/lib/serverActions/admins/users";
import fetchService from "@/configs/http-service/fetch-settings";
import {toast} from "sonner";
import {CheckIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Button} from "@nextui-org/react";
import {Radio, RadioGroup} from "@nextui-org/radio";


const ChangeUserCard = ({user, role}: {user: User, role: string}) => {
    const [selected, setSelected] = useState(user.role)

    const handleSelect = async(selected: string) => {
        const data = {
            role: selected,
        }
        const res = await fetchService.patch(`user/${user.id}/change_role/`, {
            body: JSON.stringify(data),
            source: 'client'
        })
        return res.ok
    }
    const toastSend = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const res = await handleSelect(e.target.value)
        if (res) {
            setSelected(e.target.value)
            toast.success('Данные обновлены')
            return true
        } else {
            toast.error('Не удалось обновить данные')
            return false
        }
    }

    return (
        <>
            {/*<Card className={'w-full min-w-[350px] h-fit'}>*/}
            {/*    <CardBody>*/}
            {/*        <FormWrapper action={editUserInfo} >*/}
            {/*            <div className={'space-y-2 bg-content'}>*/}
            {/*                <input hidden name={'id'} defaultValue={user.id}/>*/}
            {/*                /!*<UserProfileForm/>*!/*/}
            {/*            </div>*/}
            {/*        </FormWrapper>*/}
            {/*    </CardBody>*/}
            {/*</Card>*/}
            {role === 'ADMIN' &&
                <>
                    <Card className={'w-full min-w-[300px] h-fit'}>
                        <CardHeader className={'flex gap-2 pb-0'}>
                            <h2>Верификация пользовКателя</h2>
                        </CardHeader>
                        <CardBody className={'space-y-2'}>
                            {user.is_email_verified
                                ? <div className={'text-success flex gap-2 w-full justify-start items-center'}>
                                    <CheckIcon/>
                                    <p>Пользователь подтвержден</p>
                                </div>
                                :
                                <FormWrapper action={verifyUser} withOutDefaultButton>
                                    <input hidden name={'id'} defaultValue={user?.id}/>
                                    <Button variant={'bordered'} type={'submit'} color={'warning'} className={'w-full text-warning'}>
                                        <ExclamationTriangleIcon/>
                                        <p>Подтвердить аккаунт</p>
                                    </Button>
                                </FormWrapper>
                            }

                        </CardBody>
                    </Card>
                    <Card className={'w-full min-w-[300px] h-fit'}>
                        <CardHeader className={'flex gap-2 pb-0'}>
                            <h2>Блокировка пользователя</h2>
                        </CardHeader>
                        <CardBody className={'space-y-2'}>
                            {user.is_blocked
                                ? <FormWrapper action={unblockUser} withOutDefaultButton>
                                    <input hidden name={'id'} defaultValue={user?.id}/>
                                    <Button variant={'bordered'} type={'submit'} color={'warning'} className={'w-full text-warning'}>
                                        <ExclamationTriangleIcon/>
                                        <p>Разблокировать пользователя</p>
                                    </Button>
                                </FormWrapper>
                                :
                                <FormWrapper action={blockUser} withOutDefaultButton>
                                    <input hidden name={'id'} defaultValue={user?.id}/>
                                    <Button variant={'bordered'} type={'submit'} color={'warning'} className={'w-full text-warning'}>
                                        <ExclamationTriangleIcon/>
                                        <p>Заблокировать пользователя</p>
                                    </Button>
                                </FormWrapper>
                            }

                        </CardBody>
                    </Card>
                    <Card className={'w-full min-w-[300px] h-fit'}>
                        <CardBody className={'space-y-2'}>
                            <RadioGroup
                                label="Выберите роль"
                                defaultValue={selected}
                                onChange={(e) => toastSend(e)}
                            >
                                <Radio value="USER">Пользователь</Radio>
                                <Radio value="MANAGER">Менеджер</Radio>
                                <Radio value="ADMIN">Админ</Radio>
                            </RadioGroup>
                            {/*<Checkbox isSelected={selected} onClick={() => toastSend(!selected)}>Менеджер</Checkbox>*/}
                        </CardBody>
                    </Card>
                </>
            }
        </>

    )
}

export default ChangeUserCard