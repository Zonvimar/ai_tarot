'use client'
import React, {Key, useEffect, useState} from 'react'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

export interface Option {
    value: string | number;
    label: string;
    disable?: boolean;
    fixed?: boolean;
    default?: boolean;

    [key: string]: string | boolean | undefined | number;
}

interface MultipleSelectorProps {
    label: string,
    selectDefaultOptionFirst?: boolean,
    description?: string | boolean,
    size: "sm" | "md" | "lg",
    name: string,
    type?: 'single' | 'multi',
    optionKey?: string,
    readOnly?: boolean,
    idKey?: string,
    required?: boolean,
    initOptions?: Option;
    defaultOptions?: Option[];
    withOutDefaultValues?: boolean,
    options?: Option[];
    placeholder?: string;
    loadingIndicator?: React.ReactNode;
    emptyIndicator?: React.ReactNode | string;
    delay?: number;
    triggerSearchOnFocus?: boolean;
    onSearch?: (value: string) => Promise<Option[]>;
    onChange?: (key: null | React.Key) => void;
    maxSelected?: number;
    onMaxSelected?: (maxLimit: number) => void;
    hidePlaceholderWhenSelected?: boolean;
    disabled?: boolean;
    groupBy?: string;
    className?: string;
    badgeClassName?: string;
    selectFirstItem?: boolean;
    creatable?: boolean;
    fetchFn?: (id?: string | number) => Promise<{ [key: string]: any }[]>;
    // value?: Option[]
}
//
export interface MultipleSelectorRef {
    // selectedValue: Option[];
    // input: HTMLInputElement;
}




const AsyncSelectorField2 = React.forwardRef<MultipleSelectorRef, MultipleSelectorProps>(
    (
        {
            initOptions,
            onChange,
            description,
            defaultOptions: arrayDefaultOptions = [],
            options: arrayOptions,
            optionKey, idKey,
            disabled,
            label,
            size,
            name,
            required = false,
            fetchFn,
            selectDefaultOptionFirst = false,
        }: MultipleSelectorProps,
    ) => {
        const [options, setOptions] = useState<Option[]>([])
        const [isLoading, setIsLoading] = useState(false)
        const [inputValue, setInputValue] = React.useState<Key | null>(null);
        const [selectedKey, setSelectedKey] = React.useState<string | number | null>();

        const fetchData = async () => {
            setIsLoading(true)
            try {
                if (fetchFn) {
                    const data: any[] = await fetchFn()
                    const fetchedOptions = data?.map(d => (
                        {
                            ...d,
                            value: idKey
                                ? d[idKey]
                                : d.id,
                            label: optionKey
                                ? d[optionKey]
                                : d.title,
                            ...(d.default && {default: d.default}),
                        }
                    ))
                    setOptions([...fetchedOptions])
                    if (initOptions) {
                        const providedOptions = fetchedOptions?.find(i => i?.id == initOptions?.value)
                        console.log('providedOptions?.id')
                        console.log(providedOptions?.id)
                        setSelectedKey(providedOptions?.id.toString())
                        if (providedOptions) {
                            setInputValue(providedOptions?.id as React.Key)
                        }
                    }
                    if (selectDefaultOptionFirst) {
                        console.log('fetchedOptions?.id')
                        console.log(fetchedOptions[0]?.id)
                        setSelectedKey(fetchedOptions[0]?.id.toString())
                        setInputValue(fetchedOptions[0]?.id as React.Key)
                    }
                    return
                }
            } catch (e) {
                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }
        }

        useEffect(() => {
            if (fetchFn && ((!initOptions?.length || !initOptions))) {
                fetchData()
            }
        }, [fetchFn])

        const onSelectionChange = (id: React.Key | null) => {
            console.log(id)
            setInputValue(id as React.Key)
            setSelectedKey(id?.toString())
            onChange && onChange(id)
        }

        return (
            <>
                <Autocomplete
                    label={label}
                    size={size}
                    description={description ? description : null}
                    isRequired={required}
                    required={required}
                    defaultItems={options}
                    isDisabled={disabled}
                    scrollShadowProps={{
                        isEnabled: false
                    }}
                    listboxProps={{
                        emptyContent: 'Ничего не найдено',
                    }}
                    isLoading={isLoading}
                    selectedKey={selectedKey}
                    onSelectionChange={onSelectionChange}
                >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <input hidden value={Number(inputValue)} name={name}/>
            </>

        )
    }
)

AsyncSelectorField2.displayName = 'AsyncSelectorField2'
export default AsyncSelectorField2
