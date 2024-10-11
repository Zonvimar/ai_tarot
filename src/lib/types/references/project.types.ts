type Project = {
    id: number,
    internal_title: string,
    external_title: string,
    responsible: { id: number, name: string },
    default_status: { id: number, title: string },
    priority: number,
}

type CompanyProject = {
    id: number,
    title: string,
    // internal_title: string,
    // external_title: string,
    responsible: { id: number, name: string },

}

export type {
    Project, CompanyProject
}