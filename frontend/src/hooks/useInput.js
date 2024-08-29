import {useState} from "react";
import selectData from "../utils/sql/selectData";

// 입력값을 객체 형태로 관리하는 useInput 훅
export function useInput(initialValues) {
    // 초기 상태 설정
    const [values, setValues] = useState(initialValues);

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        console.log(e.target)
        const {name, value} = e.target;
        setValues(prevValues => ({
            ...prevValues, [name]: value
        }));
    };

    // 카드번호 중복 확인 핸들러
    const doubleCheck = async (e) => {
        console.log(e.nativeEvent.data)
        const {name, value} = e.target;
        setValues(prevValues => ({
            ...prevValues, [name]: value
        }));
        if (name === 'cardNum' && value.length >= 16) {
            const check = await selectData('card', '/select', ['cardNum'], ['cardNum'], [value]);
            console.log('check:', check);
            if (check.success) {
                alert(`카드번호 ${value}는 사용할 수 없습니다`);
            } else {
                alert('가능');
            }
        }

        if (name === 'bookId') {
            const check = await selectData('book', '/select', ['bookId'], ['bookId'], [value]);
            if (value.length === 0) {
                setValues(prevValues => ({
                    ...prevValues, ['doubleCheck']: ''
                }));
            } else if (check.success) {
                setValues(prevValues => ({
                    ...prevValues, ['doubleCheck']: '사용불가'
                }));

            } else {

                setValues(prevValues => ({
                    ...prevValues, ['doubleCheck']: '사용가능'
                }));
            }
        }
    };
    const directInsert = (name, data) => { // 주소 API에서 오는 데이터를 받음
        setValues(prevValues => ({
            ...prevValues, [name]: data
        }));

    }

    return [values, handleChange, doubleCheck, directInsert];
}
