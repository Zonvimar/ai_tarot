import React from "react";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Company} from "@/lib/types/references/companies.types";
import {Chip, Snippet} from "@nextui-org/react";
import {Sniglet} from "next/dist/compiled/@next/font/dist/google";


const CompanyInfoTab = ({company}: { company: Company }) => {

    return (
        <>
            <Card className={'w-full min-w-[350px] h-fit'}>
                <CardHeader>
                    <h1>Информация о компании</h1>
                </CardHeader>
                <CardBody className={'space-y-4'}>
                    <p>Название: <span className={'font-bold'}>{company?.title}</span></p>
                    <p className={'flex flex-wrap gap-1 items-center'}>
                        Телефон компании:
                        {company?.phones.length > 0 ?
                            company.phones.map((phone) =>
                                <Snippet variant={'solid'}
                                         className={'pl-2 py-0 pr-0 rounded-xl'}
                                         color={'primary'} symbol={''}
                                         tooltipProps={{placement: 'top', content: "Нажмите чтобы скопировать"}}>
                                    {phone.value}
                                </Snippet> )
                            :
                            ' Не указан'
                        }
                    </p>
                    <p className={'flex flex-wrap gap-1 items-center'}>
                        Электронная почта компании:
                        {company?.email.length > 0 ?
                            company.email.map((email) =>
                                <Snippet variant={'solid'}
                                         className={'pl-2 py-0 pr-0 rounded-xl'}
                                         color={'primary'} symbol={''}
                                         tooltipProps={{placement: 'top', content: "Нажмите чтобы скопировать"}}>
                                    {email.value}
                                </Snippet> )
                            :
                            ' Не указан'
                        }
                    </p>
                    {/*<p>Почта компании: {company.email ? company.email : 'Не указан'}</p>*/}
                    {/*TODO*/}
                </CardBody>
            </Card>
        </>
    )
}

export default CompanyInfoTab