import {instance} from "../instance/instance";

export const userPostApi = async (endPoint, data) => {
    try {
        return await instance.post(`/user/${endPoint}`, data)
    } catch (err) {
        console.log(err)
    }
}