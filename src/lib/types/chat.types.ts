type Message = {
    id: number,
    text: string,
    file: {
        id: number,
        name: string
    },
    created_at: string,
    created_by: {
        id: number,
        name: string
    },
}


export type {
    Message
}