import axios from "axios";
import {axiosPost} from "../axiosPost";
import port from "../port";

/** 테이블 이름 ,URL, 얻을 value 값 이름, 비교할 값이름, 값 */
async function selectData(tableName, url, ...query) {
    console.log(tableName, url, ...query);
    /*  const queryData = query[0];
      const filterKey = query[1]
      const filterVal = query[2]*/
    const [queryData, filterKey, filterVal] = query
    const key = filterKey.map((data) => `${data} = ?`).join(' AND ')
    console.log(`SELECT ${queryData} FROM \`${tableName}\` WHERE ${key}`, ',', filterVal)
    const sql = `SELECT ${queryData} FROM \`${tableName}\` WHERE ${key}`;
    console.log(sql, filterVal, url)
    const data = await axios.post(`${port}${url}`, {
        sql, filterVal
    }, axiosPost(true))
    console.log('selectData:', data.data)
    return (data.data)
}

export default selectData;