import {  ListParams, ListResponse, User} from '../models';
import axiosClient from "./axiosClient"


const userApi = {
    getAll(params:ListParams) : Promise<ListResponse<User>>{
        const url = '/users'
        return axiosClient.get(url,{
            params
        })
    },
    getById(id: string) : Promise<User>{
        const url = `/users/${id}`
        return axiosClient.get(url)
    },

    add(data: User) : Promise<User>{
        const url = '/users'
        return axiosClient.post(url, data)
    },

    update(data: User) : Promise<User>{
        const url = '/users'
        return axiosClient.put(url, data)
    },

    remote(id: string) : Promise<any>{
        const url = `/users/${id}`
        return axiosClient.delete(url)
    }
}

export default userApi