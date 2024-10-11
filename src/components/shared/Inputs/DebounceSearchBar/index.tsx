'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import React, {FC} from 'react'
import {useDebouncedCallback} from 'use-debounce'
import {Input} from "@nextui-org/input";
import {XIcon, SearchIcon} from "lucide-react";

type Props = {
    placeholder?: string
}

const DebounceSearchBar: FC<Props> = ({placeholder = 'Поиск...'}) => {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((search) => {
        const params = new URLSearchParams(searchParams)
        if(search && params.get('page')) params.set('page', '0')
        if (search) {
            params.set('search', search)
        } else {
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 500)

    const id = `search-deferred-input` as const

    return (
        <div className={'relative group w-full'}>
            <Input variant={'bordered'} className={'peer h-max  placeholder:text-background/40 dark:placeholder:text-muted-foreground/40'}
                   defaultValue={searchParams.get('search' ?? '')?.toString()} autoCorrect={'off'}
                   onChange={e => handleSearch(e.target.value)}
                   id={id} name={'search'} placeholder={placeholder} autoComplete={'off'} type={'text'}
            />
            <SearchIcon
                className={`${searchParams.get('search' ?? '')?.toString() ? 'hidden' : 'block'} absolute right-2 top-0 bottom-0 my-auto text-foreground opacity-50 peer-focus:opacity-100 peer-focus:text-ring transition-all`}
            />
            <XIcon onClick={() => handleSearch('')}
                        className={`${searchParams.get('search' ?? '')?.toString() ? 'block' : 'hidden'} absolute right-2 top-0 bottom-0 my-auto text-foreground opacity-50 peer-focus:opacity-100 peer-focus:text-ring transition-all cursor-pointer`} />
        </div>
    )
}

export default DebounceSearchBar