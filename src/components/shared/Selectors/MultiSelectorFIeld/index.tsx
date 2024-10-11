'use client'
import React, {useEffect, useState} from 'react'
import {Chip, Select, SelectedItems, Selection, SelectItem} from "@nextui-org/react";

export interface Option {
    id: string | number;
    label?: string;
    [key: string]: string | boolean | undefined | number;
}

interface MultipleSelectorProps {
    label: string,
    name: string,
    size: 'sm' | 'md' | 'lg',
    optionKey?: string,
    required?: boolean,
    initOptions?: Option[];
    options?: Option[];
    onChange?: (value: any[]) => void;
    fetchFn?: (id?: string | number) => Promise<{ [key: string]: any }[]>;
}
export interface MultipleSelectorRef {
}





const MultipleSelector = React.forwardRef<MultipleSelectorRef, MultipleSelectorProps>(
    ({
            label,
            size,
            name,
            initOptions,
            onChange,
            options: arrayOptions,
            optionKey,
            required = false,
            fetchFn,
    }: MultipleSelectorProps,) => {
        const [options, setOptions] = useState<Option[]>([])
        const [isLoading, setIsLoading] = useState(false)
        const [inputValue, setInputValue] = React.useState<string>('[' + initOptions?.map(i => i?.id).toString() + ']');
        const [selectedKeys, setSelectedKeys] = React.useState<Selection | undefined>(new Set(initOptions?.map(i => i?.id?.toString())));
        const fetchData = async () => {
            try {
                setIsLoading(true)
                if (fetchFn) {
                    const data: any[] = await fetchFn()
                    console.log(label, 'post')
                    console.log(data)
                    const fetchedOptions = data?.map(d => (
                        {
                            ...d,
                            id: d.id,
                            label: optionKey
                                ? d[optionKey]
                                : d.title,
                            ...(d.default && {default: d.default}),
                        }
                    ))
                    setOptions([...fetchedOptions])
                    if (initOptions?.length) {
                        const providedOptions = [...data?.map(d => ({id: d.id}))]?.filter(o => {
                            return initOptions?.find(i => i?.id == o?.id)
                        })
                        // console.log('providedOptions?.toString()')
                        // console.log(providedOptions?.toString())
                        // console.log(new Set(providedOptions?.map(i => i?.id?.toString())))
                        // providedOptions.length && setSelectedKeys(new Set(providedOptions?.map(i => i?.id?.toString())))
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
            if (fetchFn) {
                fetchData()
            }
        }, [fetchFn])

        const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log('keys.toString()')
            console.log(e.target.value)
            console.log(e.target.value.split(','))
            setInputValue('[' + e.target.value + ']');
            setSelectedKeys(new Set([e.target.value]))
        };

        return (
            <>
                <Select
                    label={label}
                    items={options}
                    isRequired={required}
                    size={size}
                    selectionMode="multiple"
                    // className="max-w-xs"
                    isLoading={isLoading}
                    // defaultSelectedKeys={selectedKeys}
                    defaultSelectedKeys={selectedKeys}
                    onChange={handleSelectionChange}
                    // defaultValue={initOptions}
                    scrollShadowProps={{
                        isEnabled: false
                    }}
                    isMultiline={true}
                    classNames={{
                        trigger: "min-h-12 py-2",
                    }}
                    renderValue={(items: SelectedItems<Option>) => {
                        console.log('items')
                        console.log(items)
                        return (
                            <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <Chip key={item.key}>{item.textValue}</Chip>
                                ))}
                            </div>
                        );
                    }}
                >
                    {(item) => (
                        <SelectItem key={item.id} textValue={item.label}>
                            <div className="flex gap-2 items-center">
                                <div className="flex flex-col">
                                    <span className="text-small">{item.label}</span>
                                </div>
                            </div>
                        </SelectItem>
                    )}
                    {/*{(item) => (*/}
                    {/*    <SelectItem key={options.id} textValue={options.label}>*/}
                    {/*        <div className="flex gap-2 items-center">*/}
                    {/*            <div className="flex flex-col">*/}
                    {/*                <span className="text-small">{options.label}</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </SelectItem>*/}
                    {/*)}*/}

                    {/*{options.map((option) => (*/}
                    {/*    <SelectItem key={option.id}>*/}
                    {/*        {option.label}*/}
                    {/*    </SelectItem>*/}
                    {/*))}*/}
                </Select>
                <input hidden value={inputValue} name={name}/>
            </>
        )
    }
)
//
MultipleSelector.displayName = 'MultipleSelector'
export default MultipleSelector
