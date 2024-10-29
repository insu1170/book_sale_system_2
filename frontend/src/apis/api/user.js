import {instance} from "../instance/instance";

export const userPostApi = async (endPoint, ...data) => {
    console.log(data, 'fd', ...data)
    try {
        console.log('요청이 왔어요');
        const result = await instance.post(`/user/${endPoint}`, data)
        if (result.status === 200) {
            if (result.data.length === 0) {
                return {data: result.data, success: false}
            }
            return {data: result.data, success: true}

        } else {
            return alert('오류가 발생했습니다')
        }
    } catch (err) {
        alert('실패')
        console.log(err)
    }
}

export const userGetApi = async (endPoint, ...data) => {

    try {
        const result = await instance.get(`/user/${endPoint}`, {params: data});
        if (result.status === 200) {
            if (result.data.length === 0) {
                return {data: result.data, success: false}
            }
            return {data: result.data, success: true}
        } else {
            return alert('오류가 발생했습니다')
        }

    } catch (err) {
        alert('작업 실패');
        console.log(err);
    }

}