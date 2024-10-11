'use client'
import React from 'react'
import PageSizeController from "@/components/shared/Table/ClientFiltering/PageSizeController";
import PaginationBar from "@/components/shared/Table/ClientFiltering/PaginationBar";

const CustomTableFooter = ({totalPages}: {totalPages: number}) => {
    return (
        <div className={'flex gap-2 items-center'}>
            <PaginationBar totalPages={totalPages}/>
            <PageSizeController totalPages={totalPages}/>
        </div>
    )
}

export default CustomTableFooter