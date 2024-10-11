type Department = {
    id: number,
    title: string,
    company: number,
    project: number,
    responsible: number,
    _employees: { id: number, full_name: string }[]
}

export type {
    Department
}