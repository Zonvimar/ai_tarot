// type UserProfile = {
//     id: number,
//     // company_title: string,
//     name: string,
//     surname: string,
//     middle_name: string,
//     email: string,
//     phone: string,
//     avatar: number
//     company: { id: number, title: string },
//     // _company: string,
//     role: string,
//     // bitrix_user: number,
//     account_type: string,
//     is_email_verified: boolean,
//     // tg_id: number,
//     // contact: number,
//     // _contact: string,
//     // department: number,
//     // _department: string,
//     // is_manager: boolean,
// }


type User = {
    id: number,
    name: string,
    surname: string,
    middle_name: string,
    email: string,
    phone: string,
    company: {
        id: number,
        title: string
    },
    account_type: string,
    role: string,
    avatar: number,
    is_email_verified: boolean,
    is_blocked: boolean,
    is_company_assigned: boolean,
    crm_contact: {
        id: string,
        name: string
    }
}

type Users = {
    id: number,
    name: string,
    surname: string,
    middle_name: string,
    email: string,
    phone: string,
    // company: {
    //     id: number,
    //     title: string
    // },
    // account_type: string,
    role: string,
    is_email_verified: boolean,
    avatar: number
}


type newUserProfile = {
    id: number,
    company_title: string,
    name: string,
    surname: string,
    middle_name: string,
    email: string,
    phone: string,
    avatar: number
}

// type Notifications = {
//     id: number,
//     title: string,
//     text: string,
//     is_viewed: boolean,
//     created_date: string,
//     object_type: string,
//     object_id: number,
//     receiver: number,
// }

type Notifications = {
    id: number,
    type: string,
    title: string,
    text: string,
    is_read: boolean,
    created_at: string,
    referenced_object_id: number,
}


export type {
    Notifications, newUserProfile, User, Users
}