'use client'
import {User} from "@/lib/types/user.types";
import React from "react";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import FormWrapper from "@/components/shared/FormWrapper";
import {createBitrixUser} from "@/lib/serverActions/admins/users";
import {Button} from "@nextui-org/react";
import LinkUserSelector from "../LinkUserSelectors";

const BitrixLinkTab = ({user}: { user: User }) => {
    return (
        <>
            <LinkUserSelector user={user}/>
            {/*{!user.contact &&*/}
                <Card className={'w-full min-w-[350px] h-fit items-stretch'}>
                    <CardHeader className={'pb-0'}>
                    <p>Не нашли соответствующий контакт?</p>
                    </CardHeader>
                    <CardBody className={'space-y-2 h-fit'}>
                        <FormWrapper action={createBitrixUser} withOutDefaultButton>
                            <input hidden name={'id'} defaultValue={user?.id}/>
                            <div className={'w-fit'}>
                                <Button color={'warning'} type={'submit'} variant={'bordered'}>Создать CRM контакт</Button>
                            </div>
                        </FormWrapper>
                    </CardBody>
                </Card>
            {/*}*/}
        </>

    )
}

export default BitrixLinkTab