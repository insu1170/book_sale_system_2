
import selectData from "../utils/sql/selectData";
import insertData from "../utils/sql/insertData";
import {useNavigate} from "react-router-dom";

export function useFormSubmit(formType) {
    const navigate = useNavigate();
    const handleSubmit = async (formData) => {

        try {
            let result;
            console.log('핸들 서브밑', formData,formType)
            if (formType === 'login') {
                console.log('로그인중')
                result = await selectData('user', '/select', ['userId', 'passWord'], ['userId', 'passWord'], [formData.id, formData.password])
                if (result.success) {
                    alert('로그인 완료')
                    navigate('/main')
                } else {
                    alert('로그인 실패 id 혹은 비번 확인')
                }
            } else if (formType === 'signup') {
                console.log('가입 중')
                if (formData.password === formData.checkPassword) {

                    result = await insertData('user', '/insert', ['userId', 'passWord', 'userName', 'phoneNum'], [formData.id, formData.password, formData.nickname, formData.phone]);
                    if (result.success) {
                        alert('가입 성공')
                        navigate('/main')
                    } else {
                        alert('가입 실패: 아이디 중복,비밀번호 등을 다시 확인하세요')
                    }
                }
            }
        } catch (err) {
            alert(`${formType === 'login' ? '로그인' : '회원가입'} 중 오류가 발생했어여`)
        }
    }
    return {handleSubmit}

}