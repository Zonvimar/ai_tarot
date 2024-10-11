'use client'
import {User} from "@/lib/types/user.types";
import TextField from "@/components/shared/Inputs/TextField";
import {Avatar} from "@nextui-org/avatar";
import React, {useState} from "react";
import BASE_URL from "@/configs/http-service/constants/baseUrl";
import {User2Icon} from "lucide-react";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import FormWrapper from "@/components/shared/FormWrapper";
import {verifyUser} from "@/lib/serverActions/admins/users";
import {CheckIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Button} from "@nextui-org/react";
import fetchService from "@/configs/http-service/fetch-settings";
import {toast} from "sonner";
import {Radio, RadioGroup} from "@nextui-org/radio";


const UserInfoTab = ({user}: { user: User }) => {
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
            <Card className={'w-full min-w-[350px] h-fit'}>
                <CardBody className={'space-y-2'}>
                    <h2>Личные данные</h2>
                    <TextField label={'Название компании'} readOnly name={'company_str'} defaultValue={user?.company?.title}
                               isRequired/>
                    <div className={'flex items-center w-full gap-2'}>
                        <div className={'space-y-2 w-full'}>
                            <TextField label={'Фамилия'} name={'last_name'} readOnly isRequired
                                       defaultValue={user?.surname}/>
                            <TextField label={'Имя'} name={'first_name'} readOnly isRequired
                                       defaultValue={user?.name}/>
                            <TextField label={'Отчество'} name={'second_name'} readOnly defaultValue={user?.middle_name}/>
                        </div>
                        <div className={'p-4 flex items-center justify-center max-w-[30%]'}>
                            <div>
                                <Avatar className={'w-24 h-24 transition-transform'}
                                        isBordered
                                        fallback={<User2Icon className={'w-24 h-24'}/>}
                                        src={user.avatar ? BASE_URL + 'image/get/' + user.avatar + '/?type=FULL' : undefined}
                                        // src={user?.avatar_url && BASE_URL + user?.avatar_url.slice(1)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'space-y-2 mt-4 w-full'}>
                        <h2>Контакты</h2>
                        <TextField label={'Почта'} name={'email'} type={'email'} readOnly isRequired
                                   defaultValue={user?.email}/>
                        <TextField label={'Телефон'} name={'phone'} type={'tel'} readOnly inputMode={'numeric'} isRequired
                                   defaultValue={user?.phone}/>
                    </div>
                </CardBody>
            </Card>
            <Card className={'w-full min-w-[300px] h-fit'}>
                <CardHeader className={'flex gap-2 pb-0'}>
                    <h2>Верификация пользователя</h2>
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

    )
}

export default UserInfoTab