type Company = {
    id: number,
    title: string,
    // bitrix_company_id: number,
    phones: { value: string }[],
    email: { value: string }[],
    is_setup: boolean
}
export type {
    Company
}