'use server'
import fetchService from "@/configs/http-service/fetch-settings";
import {Company} from "@/lib/types/references/companies.types";
import {Users} from "@/lib/types/user.types";


const getCompany = async(id: string | number): Promise<Company> => {
    const res = await fetchService.get(`company/${id}/info/`, {
        next: {
            tags: ['company'],
        }
    })
    return res.data
}

const getUsersInCompany = async(id: string | number): Promise<Users[]> => {
    const res = await fetchService.get(`company/${id}/users/`, {
        next: {
            tags: ['company'],
        }
    })
    return res.data
}

const getAllCompanies = async(): Promise<Company[]> => {
    const res = await fetchService.get('company/list/', {
        next: {
            tags: ['companies'],
        }
    })
    return res.data
}

export {
    getAllCompanies,
    getCompany,
    getUsersInCompany
}