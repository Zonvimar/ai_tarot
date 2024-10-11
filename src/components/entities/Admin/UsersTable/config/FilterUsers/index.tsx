'use client'
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/checkbox";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";


const FilterUsers = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [selected, setSelected] = useState(searchParams.get('is_verify') === 'false')
    const handleFilter = (isSelected: boolean) => {
        const params = new URLSearchParams(searchParams)
        if (isSelected) {
            params.delete('is_show_only_not_verified')
        }
        if(!isSelected) {
            params.set('is_show_only_not_verified', 'true')
        }
        router.push(`${pathname}?${params.toString()}`)

    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className={'bg-primary text-white'}>Фильтры</Button>
            </DropdownTrigger>
            <DropdownMenu closeOnSelect={false} aria-label="Action event example"
            >
                <DropdownItem key="new">
                    <Checkbox isSelected={selected} onClick={() => setSelected(!selected)} onValueChange={(selected: boolean) => handleFilter(selected)}>Только не подтвержденные</Checkbox>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default FilterUsers