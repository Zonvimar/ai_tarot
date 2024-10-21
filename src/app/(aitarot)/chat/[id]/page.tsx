import React, {FC} from 'react'


type Props = {
    searchParams: {
        email: string,
        resetPassword: string,
    },
    params: {
        id: string,
    }
}

const Page: FC<Props> = async({searchParams, params}) => {
    return (
        <>
            <p>New chat {params.id ? params.id : 'fkdfjsdklfjk'}</p>
        </>
    )
}

export default Page