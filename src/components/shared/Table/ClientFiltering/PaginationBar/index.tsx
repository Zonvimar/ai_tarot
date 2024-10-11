'use client'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import React, {FC, useEffect, useState} from 'react'
import Link from 'next/link'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Input} from "@nextui-org/input";

type PaginationBarProps = {
    totalPages: number
}

const PaginationBar: FC<PaginationBarProps> = ({totalPages}) => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 0
    const {replace} = useRouter()

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        // const pageNum = Number(pageNumber)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const [curPage, setCurPage] = useState<number | ''>(currentPage ?? 1)

    useEffect(() => {
        setCurPage(currentPage)
    }, [currentPage])

    return (
        <div className={'flex gap-1 items-center '}>
            <Link href={createPageURL(0)} replace aria-disabled>
                <DoubleArrowLeftIcon
                    className={`cursor-pointer hover:text-accent`}
                />
            </Link>
            <Link href={createPageURL(currentPage - 1)} replace onClick={e => currentPage === 0 && e.preventDefault()}>
                <ChevronLeftIcon
                    className={`cursor-pointer hover:text-accent`}
                />
            </Link>
            <Link href={createPageURL(currentPage + 1)} replace
                  onClick={e => currentPage === totalPages - 1 && e.preventDefault()}>
                <ChevronRightIcon
                    className={`cursor-pointer hover:text-accent`}
                />
            </Link>
            <Link href={createPageURL(totalPages - 1)} replace>
                <DoubleArrowRightIcon
                    className={`cursor-pointer hover:text-accent`}
                />
            </Link>
            <p className={'w-fit'}>Страница</p>
            <Input value={(Number(curPage) + 1).toString()} variant={'bordered'} className={'w-[60px]'}
                   onChange={e => {
                       let p = Number(e.target.value)
                       if (p) {
                           let p = Number(e.target.value)
                           if (p <= 0) {
                               p = 1
                           }
                           if (p > totalPages) {
                               p = totalPages
                           }
                           setCurPage(p - 1)
                           return replace(createPageURL(p - 1))
                       } else {
                           setCurPage('')
                           replace(createPageURL(0))
                       }
                   }}/>
            <p className={'w-[60px]'}>из {totalPages || 1}</p>
        </div>
    )
}

export default PaginationBar