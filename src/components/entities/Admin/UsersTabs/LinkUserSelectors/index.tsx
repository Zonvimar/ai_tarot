'use client'
import React, {useEffect, useState} from 'react'
import fetchService from "@/configs/http-service/fetch-settings";
import {User} from "@/lib/types/user.types";
import AsyncSelectorField2 from "@/components/shared/Selectors/TestSelector";
import {addCompanyUser, setCRMtoUser} from "@/lib/serverActions/admins/users";
import {ContactCRM} from "@/lib/types/references/contactCRM.types";
import {getAllCompanies} from "@/lib/serverActions/admins/companies";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import FormWrapper from "@/components/shared/FormWrapper";

const LinkUserSelector = ({user}: {user: User}) => {
    const [currentCompany, setCurrentCompany] = useState<number | null>(null)
    const [contacts, setContacts] = React.useState<ContactCRM[]>([])
    const [currentContact, setCurrentContact] = useState<number | null>(null)

    useEffect(() => {
        if (user?.company) {
            setCurrentCompany(user.company.id)
        }
    }, [])

    const fetchCRMContacts = async(company: string | number ) => {
        const response = await fetchService.get(`company/${company}/crm_contacts/`, {
            source: 'client',
            next: {
                tags: ['user/{id}'],
            }
        })
        console.log('DATA')
        console.log(response)
        console.log(company)
        return response.data
    }

    return (
        <>
            <Card className={'w-full min-w-[350px] flex-1 items-stretch'}>
                <CardHeader>
                    <p>Компания</p>
                </CardHeader>
                <CardBody className={'flex flex-col justify-end h-full gap-3'}>
                    {user?.company?.title &&
                        <p>Указанная при регистрации: <span className={'font-bold'}>{user?.company?.title}</span></p>
                    }
                    <FormWrapper action={addCompanyUser}>
                        <input hidden name={'id'} defaultValue={user?.id}/>
                        <AsyncSelectorField2
                            description={user.company === null ? 'Для привязки к CRM выберите компанию а затем выберите контакт' : false}
                            required={true} label={'Компания'} size={'sm'} name={'company'}
                            initOptions={{label: user?.company?.title, value: user?.company?.id}}
                            onChange={opt => setCurrentCompany(Number(opt) ?? null)}
                            fetchFn={getAllCompanies}/>
                    </FormWrapper>
                </CardBody>
            </Card>
            <Card className={'w-full min-w-[350px] flex-1 items-stretch'}>
                <CardHeader>
                    <p>CRM контакт</p>
                </CardHeader>
                <CardBody className={'space-y-2'}>
                    <FormWrapper action={setCRMtoUser}>
                        <input hidden name={'id'} defaultValue={user?.id}/>
                        <input hidden name={'companyId'} defaultValue={user?.company?.id}/>
                        <AsyncSelectorField2
                            description={user.company === null ? 'Для привязки к CRM выберите компанию а затем выберите контакт' : false}
                            required={true} disabled={user.company === null} label={'Контакт'} size={'sm'} name={'crm_contact_id'}
                            initOptions={{label: user?.crm_contact?.name, value: user?.crm_contact?.id}}
                            optionKey={'name'}
                            onChange={opt => setCurrentContact(Number(opt) ?? null)}
                            fetchFn={() => fetchCRMContacts(currentCompany ?? 0)}/>
                    </FormWrapper>
                </CardBody>
            </Card>

        </>
    )
}

export default LinkUserSelector