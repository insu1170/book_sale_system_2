import {useState} from "react";
import selectData from "../utils/sql/selectData";

//** 첫 번째 매개변수를 input의 value에 넣고 onChange에 두 번째꺼 */
export function useInput(value) {
    const [inputValue, setInputValue] = useState(value)
    const changeHandle = (e) => {
        setInputValue(e.target.value)
    }

    const DoubleCheck = async (e) => {
        setInputValue(e.target.value)
        if (e.target.value.length >= 16) {
            const check = await selectData('card', '/select', ['cardNum'], ['cardNum'], [e.target.value])
            console.log('check:', check);
            if (check.success) {
                alert(`카드번호 ${e.target.value}는 사용할 수 없습니다 `)
            }else{
                alert('가능')
            }
        }
    }

    return [inputValue, changeHandle, DoubleCheck];
}
