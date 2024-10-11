'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import React, {FC} from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection} from "@nextui-org/react";

type PageSizeControllerProps = {
    totalPages: number
}

const PAGE_SIZES = [10, 20, 30, 50]

const PageSizeController: FC<PageSizeControllerProps> = ({totalPages}) => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams= useSearchParams()
    const psz = searchParams.get('page_size') ?? 30

    const createPageURL = (pageSize: number | string, event: any) => {
        const params = new URLSearchParams(searchParams)
        event.preventDefault();
        params.set('page', '0')
        params.set('page_size', pageSize.toString())
        router.push(`${pathname}?${params.toString()}`)
        // return `${pathname}?${params.toString()}`
    }
    //
    // console.log(psz)
    // console.log('psz', searchParams.toString())

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant={'bordered'} className={'w-fit min-w-[40px] px-2'}>
                    <p className={'sm:flex hidden'}>Показано </p>{psz}
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownSection title={'Количество строк'}>
                    {
                        PAGE_SIZES.map(option => (
                            // <Link referrerPolicy={'no-referrer'} href={createPageURL(option)} replace key={`psz-option-${option}`}>
                                <DropdownItem value={option} className={''} onClick={(e) => createPageURL(option, e)}>
                                    {/*<Link referrerPolicy={'no-referrer'} className={'w-full h-full px-1 py-1 my-1'} href={createPageURL(option)}>*/}
                                        {option}
                                    {/*</Link>*/}
                                </DropdownItem>
                            // </Link>
                        ))
                    }
                </DropdownSection>
                {/*<DropdownMenuLabel>Количество строк</DropdownMenuLabel>*/}
                {/*<DropdownMenuSeparator/>*/}

            </DropdownMenu>
        </Dropdown>
    )
}

export default PageSizeController