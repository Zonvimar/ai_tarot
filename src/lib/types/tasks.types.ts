type Tasks = {
    id: number,
    title: string,
    _status: string,
    status: number,
    created_date: string,
    description: string,
    _responsible: string,
    _responsible_avatar: string,
    responsible: number,
    is_viewed: boolean
  }

type Task = {
    id: number,
    title: string,
    description: string,
    file: {
        id: number,
        name: string
    },
    project: {
        id: number,
        title: string
    },
    company: {
        id: number,
        title: string
    },
    is_active: boolean,
    status: {
        title: string
    },
    created_at: string,
    responsible: {
        id: string,
        name: string,
        avatar: string
    },
    created_by: {
        id: number,
        name: string,
        avatar: number
    },
    closed_at: string,
    last_message: {
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
        }
    }
    // id: number,
    // _status: string,
    // _project: string,
    // responsible: {
    //     id: number,
    //     first_name: string,
    //     last_name: string,
    //     email: string,
    //     avatar: string,
    //     bitrix_id: number
    // },
    // file_url: string,
    // photo_url: string,
    // file_name: string,
    // photo_name: string,
    // chat_id: number,
    // bitrix_task_id: number,
    // bitrix_task_url: string,
    // title: string,
    // description: string,
    // created_date: string,
    // last_modified: string,
    // is_viewed: boolean,
    // file: string,
    // photo: string,
    // status: number,
    // created_by: number,
    // project: number
    // color: string,
    // _created_by: string,
    // is_active: boolean,
}

  export type {
    Task, Tasks
  }