import {useState} from "react";

//** 첫 번째 매개변수를 input의 value에 넣고 onChange에 두 번째꺼 */
export function useInput(value) {
    const [inputValue, setInputValue] = useState(value)
    const changeHandle = (e) => {
        setInputValue(e.target.value)
    }


    return [inputValue,changeHandle];
}
