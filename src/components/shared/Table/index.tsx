'use client'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/base/table'
import {ChevronUpIcon, ChevronDownIcon, ExclamationTriangleIcon} from '@radix-ui/react-icons'
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import React from 'react'
import CustomTableFooter from "@/components/shared/Table/TableFooter";
import {ChevronsUpDown} from "lucide-react";

type CustomTableProps = {
    onRowClick?: () => void,
    onRowDoubleClick?: () => void,
    redirectUrl?: string,
    redirectUrlKey?: string,
    withFooter?: boolean,
    totalPages?: number,
    toggleColumns?: boolean
}

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
} & (CustomTableProps)

const TableData = <TData, TValue>({
                                      columns,
                                      data = [],
                                      onRowClick,
                                      onRowDoubleClick,
                                      redirectUrl,
                                      redirectUrlKey,
                                      withFooter = true,
                                      totalPages = 0,
                                  }: DataTableProps<TData, TValue>) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace, push} = useRouter()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleSort = (orderingItem: string) => {
        const params = new URLSearchParams(searchParams)
        const fixedOrdering = orderingItem.startsWith('_') ? orderingItem.slice(1) + '__title' : orderingItem
        const orderingValue = searchParams?.get('ordering')?.includes('ASC') ? fixedOrdering + '_DESC' : fixedOrdering + '_ASC'
        params.set('ordering', orderingValue)
        return `${pathname}?${params.toString()}`
    }

    return (
        <>
            <Table className={'rounded-t-xl'}>
                <TableHeader className={'rounded-t-xl'}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={`header-group-${headerGroup.id}`}
                                  className={'text-sm !z-[200] rounded-t-xl'}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={`table-head-${header.headerGroup.id}-${header.column.id}-${header.id}`}
                                    onClick={() => header.column.getCanSort() && replace(handleSort(header.id.toUpperCase()))}
                                    className={`bg-primary text-primary-foreground
                                    ${header.index === 0 && 'rounded-tl-md'}
                                    ${header.index === headerGroup.headers.length - 1 && 'rounded-tr-md'}
                                    ${header.id === 'actions' && ' text-center justify-center'} 
                                    ${header.column.getCanSort() && ' cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all'}`
                                    }
                                >
                                    <div
                                        className={`break-keep flex items-center gap-1 font-normal text-sm ${header.id === 'actions' && 'text-center justify-center'}`}>
                                        {
                                            header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )
                                        }
                                        {
                                            header.column.getCanSort() && (
                                                <>
                                                    {
                                                        !searchParams?.get('ordering')?.includes(header.column.id) ? (
                                                            <ChevronsUpDown size={12}/>
                                                        ) : (
                                                            <>
                                                                {
                                                                    searchParams?.get('ordering')?.includes('-') ? (
                                                                        <ChevronDownIcon/>
                                                                    ) : (
                                                                        <ChevronUpIcon/>
                                                                    )
                                                                    // && searchParams?.get('ordering')?.includes(header.id)
                                                                    //     ?
                                                                    //     :
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows?.length
                            ? (
                                <>
                                    {
                                        table.getRowModel().rows.map((row, index) => (
                                            <TableRow
                                                //@ts-ignore
                                                onDoubleClick={() => redirectUrl && push(`${redirectUrl}/${redirectUrlKey ? row.original[redirectUrlKey] : row.original.id}`)}
                                                className={'bg-content1'}
                                                // onDoubleClick={() => console.log(row.original)}
                                                key={`table-row-${row.id}-${index}`}
                                                data-state={row.getIsSelected() && 'selected'}
                                            >
                                                {row.getVisibleCells().map((cell, i) => (
                                                        <TableCell key={`table-cell-${row.id}-${cell.id}-${i}`}
                                                                   className={`text-xs ${cell.column.id === 'actions' && 'mx-auto'}`}
                                                        >
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ),
                                                )}
                                            </TableRow>
                                        ))
                                    }
                                </>
                            )
                            : (
                                <TableRow key={`table-row-empty`}>
                                    <TableCell colSpan={columns.length} className="h-12">
                                        <div className={'grid place-items-center'}>
                                            <ExclamationTriangleIcon/>
                                            Результаты не найдены
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>
            {
                withFooter && (
                    <div className={'flex gap-2 items-center mt-auto bg-card/60 backdrop-blur-sm rounded p-1'}>
                        <CustomTableFooter totalPages={totalPages ?? 1}/>
                    </div>
                )
            }
        </>
    )
}

export default TableData