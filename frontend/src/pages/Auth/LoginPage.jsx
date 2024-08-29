import React from "react";
import styled from "styled-components";
import {useInput} from "../../hooks/useInput";
import {useFormSubmit} from "../../hooks/useFormSubmit";
import {AddContainer,AddInput} from "../../styles/stylePart";
import {AddInputs} from "../../components/Part";


export const LoginPage = () => {

    const [inputValue,handleChange]=useInput({
        idValue:'', pwValue:''
    })
    const {handleSubmit} = useFormSubmit('login');

    const loginHandle = async (e) => {
        e.preventDefault();
        await handleSubmit({id: inputValue.idValue, password: inputValue.pwValue});

    };


    return (<div>
            <AddContainer>
                <h2>Login</h2>
                <form onSubmit={loginHandle}>
                    <AddInputs label='아이디:' placeholder='아이디 입력' value={inputValue.idValue} name='idValue' onChange={handleChange}/>
                    <AddInputs  label='비밀번호:' placeholder='비밀번호 입력' value={inputValue.pwValue} name='pwValue' onChange={handleChange}/>
                    <Button type="submit">로그인</Button>
                </form>
            </AddContainer>
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
