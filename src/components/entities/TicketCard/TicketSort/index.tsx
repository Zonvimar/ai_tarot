'use client'
import {ArrowUpDown} from "lucide-react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Key, useState} from "react";

const TicketSort = () => {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState([searchParams.get('ordering') || ''])
    const router = useRouter()
    const pathname = usePathname()

    const handleSort = (key: Key | null) => {
        setLoading(true)
        const params = new URLSearchParams(searchParams)
        params.set('ordering', key?.toString() || '')
        setSelectedKeys([key?.toString() || ''])
        router.push(`${pathname}?${params.toString()}`)
        setLoading(false)
    }

    return (
        <Dropdown placement={'bottom-start'}>
            <DropdownTrigger>
                <Button isIconOnly color={'primary'} className={''} isLoading={loading}>
                    <ArrowUpDown strokeWidth={1.25}/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={handleSort}
                          selectionMode="single"
                          selectedKeys={selectedKeys}
            >
                <DropdownItem key='CREATED_AT_DESC'>
                    Сначала новые
                </DropdownItem>
                <DropdownItem key='CREATED_AT_ASC'>
                    Сначала старые
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}


export default TicketSort