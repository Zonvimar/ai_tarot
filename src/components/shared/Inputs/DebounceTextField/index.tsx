'use client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDebounce} from "use-debounce";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Input} from "@nextui-org/input";

interface TextFieldProps {
    name: string,
    placeholder?: string,
    required?: boolean,
    value?: string,
    disabled?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    filters?: any
}

const DebouncedTextField: React.FC<TextFieldProps> = ({...props}) => {

    const {
        name,
        value = '',
        disabled = false,
        placeholder = '',
        required = false,
        onBlur,
        onChange,
        filters
    } = props

    const id = `input-${name}`

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [search, setSearch] = useState(searchParams.get(name) || '')
    const [debouncedValue] = useDebounce(search, 500)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            Object.entries(filters).forEach(([key, v]) => {
                if (Array.isArray(v)) {
                    // If the value is an array, append each item with the same key
                    v.forEach(item => params.set(key, item))
                } else {
                    // Directly append non-array values
                    params.set(key, v as string)
                }
            })
            params.set(name, value)
            params.set('page', '1')

            return params.toString()
        },
        [searchParams]
    )

    const initialRender = useRef(true)

    const handleSort = () => {
        return router.replace(`${pathname}?${createQueryString('search', search)}`)
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        handleSort()
    }, [debouncedValue])

    return (
        <div className={'relative group w-[300px]'}>
            <Input required={required} disabled={disabled}
                   placeholder={placeholder} value={search} onChange={e => setSearch(e.target.value)}
                   id={id} name={name}
                   className={'peer text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground/40'}
            />
            {/*<label htmlFor={id}*/}
            {/*       className={'absolute transition-all left-2 top-3 text-xs bg-background/20 backdrop-blur-md px-[2px] text-foreground group-focus-within:text-foreground group-focus-within:-top-2 peer-placeholder-shown:-top-2 peer-valid:-top-2'}*/}
            {/*>*/}
            {/*    {label}*/}
            {/*</label>*/}
            {/*<SearchIcon className={`absolute right-2 top-1 text-foreground opacity-100 group-hover:hidden`} />*/}
        </div>
    );
};

export default DebouncedTextField;