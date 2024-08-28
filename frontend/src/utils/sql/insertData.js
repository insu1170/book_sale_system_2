import axios from 'axios';
import {axiosPost} from "../axiosPost";
import port from "../port";

/** 테이블 이름, 서버 url, key값, value값 넣으면 맞춰서 insert 문 실행*/
async function insertData(tableName, url, ...query) {

    const columns = query[0]; //key 값
    const values = query[1];  // value 값
    const columnString = columns.join(', '); // key 값 배열을 문자열로 + 배열 값마다 , 를 넣는 과정
    const queryMark = values.map(() => '?').join(', '); // 값 개수만큼 ? 문자열 생성및 위와 같이 ,를 넣는 과정

    const sqlQuery = `INSERT INTO \`${tableName}\` (${columnString}) VALUES (${queryMark})`; //쿼리문
    console.log("sf", sqlQuery)
    try {
        const response = await axios.post(`${port}${url}`, {
            sql: sqlQuery, value: values
        }, axiosPost(true));
        // 응답 처리
        const data = response.data;

        console.log(data)
        if (data.success) {
            return data
        } else {
            return false;
        }

    } catch (err) {
        return false
    }
}

export default insertData;
