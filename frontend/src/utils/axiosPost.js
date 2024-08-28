
//** 매개변수로 true false/ ture: 쿠키 사용, flase: 사용X
const axiosPost = (TF) => {
    return {
        headers: {
            "Content-Type": 'application/json'
        }, withCredentials: TF
    };
};


export {axiosPost}