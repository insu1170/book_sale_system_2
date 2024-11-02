import React from "react";
import styled from "styled-components";
import {useInput} from "../../hooks/useInput";
import {LoginContainer} from "../../styles/stylePart";
import {AddInputs} from "../../components/Part";
import {userPostApi} from "../../apis/api/user";
import useNavigate from "../../utils/useNavigate";
import Cookies from "js-cookie";

export const LoginPage = () => {

    const [inputValue, handleChange] = useInput({
        idValue: '', pwValue: ''
    })
    const navigateToHome = useNavigate('/main/main')
    const loginHandle = async (e) => {

        e.preventDefault();
        const result = await userPostApi('login', ['*'], ['userId', 'passWord'], [inputValue.idValue, inputValue.pwValue])
        console.log('요청 결과:', result,); // 요청 결과 확인
        console.log(result.success)
        if (result.success && result.data[0]) {
            alert('있음')
            Cookies.set('id', result.data[1][0].userId, {expires: 1}); // 1일 후 만료
            navigateToHome()
        } else {
            alert('없음')
        }

    };

    return (<div>
        <LoginContainer>
            <h2>Login</h2>
            <div>
                <AddInputs label='아이디:' placeholder='아이디 입력' value={inputValue.idValue} name='idValue'
                           onChange={handleChange}/>
                <AddInputs label='비밀번호:' placeholder='비밀번호 입력' value={inputValue.pwValue} name='pwValue'
                           onChange={handleChange}/>
                <Button type='submit'
                        onClick={loginHandle}>로그인</Button>
            </div>
        </LoginContainer>
    </div>);
};


// Styled components

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
