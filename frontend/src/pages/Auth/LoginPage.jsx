import React from "react";
import styled from "styled-components";
import {useInput} from "../../hooks/useInput";
import {useFormSubmit} from "../../hooks/useFormSubmit";


export const LoginPage = () => {
    const [idValue, handleIdChange] = useInput('');
    const [pwValue, handlePwChange] = useInput('');
    const {handleSubmit} = useFormSubmit('login');

    const loginHandle = async (e) => {
        e.preventDefault();
        await handleSubmit({id: idValue, password: pwValue});

    };


    return (<div>
            <FormWrapper>
                <h2>Login</h2>
                <form onSubmit={loginHandle}>
                    <Input type="text" value={idValue} onChange={handleIdChange} placeholder="아이디 입력"/>
                    <Input type="password" value={pwValue} onChange={handlePwChange} placeholder="비밀번호 입력"/>
                    <Button type="submit">로그인</Button>
                </form>
            </FormWrapper>
        </div>);
};


// Styled components

const FormWrapper = styled.div`
  width: 100%;
  max-width: 440px;
  text-align: center;
  margin: auto; /* 중앙 정렬을 위해 추가 */
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

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
