'use client'
import React, {FC, useEffect, useState} from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Pagination} from "@nextui-org/react";

type PaginationBarProps = {
    totalPages: number
}

const PaginationBar: FC<PaginationBarProps> = ({totalPages}) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 0);
    const {replace} = useRouter()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        console.log(currentPage)
        createPageURL(currentPage)
    }, [currentPage])

    return (
        <div className={'text-md flex gap-1 items-center rounded-md px-2 py-1.5 justify-center '}>
            <Pagination total={totalPages} showControls page={currentPage + 1}
                        onChange={(page) =>createPageURL(page - 1)}
            />
        </div>
    )
}

export default PaginationBar