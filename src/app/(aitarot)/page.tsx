import React, {FC} from 'react'

type Props = {
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string,
    }
}


const Page: FC<Props> = async({searchParams}) => {

    return (
        <>
            <h1>Main page</h1>
        </>
    )
}

export default Page