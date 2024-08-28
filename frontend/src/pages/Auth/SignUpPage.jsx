import React, {useState} from "react";
import styled from "styled-components";
import selectData from "../../utils/sql/selectData";
import {useInput} from "../../hooks/useInput";
import {useFormSubmit} from "../../hooks/useFormSubmit";

export const SignUpPage = () => {
    const {handleSubmit}=useFormSubmit('signup')
    const [inputIdValue, ChangeIdHandle] = useInput('')
    const [inputNameValue, ChangeNameHandle] = useInput('')
    const [inputPWValue, ChangePWHandle] = useInput('')
    const [inputPWCValue, ChangePWCHandle] = useInput('')
    const [inputPHONEValue, ChangePHONEHandle] = useInput('')
    const [idCheck, setIdCheck] = useState(false)

    const checkID = async () => {
        console.log('id:', inputIdValue);
        const data = await selectData('user', '/idCheck', ['userId'], ['userId'], [inputIdValue]);
        setIdCheck(data['success']);
        console.log(idCheck);
        alert(data['success'] ? '사용중 ID' : '사용가능');
    };

    const signUp = async ()=>{
        const data =await handleSubmit({id:inputIdValue,password:inputPWValue,name:inputNameValue,checkPassword:inputPWCValue,phone:inputPHONEValue});
        console.log(data)
    }


    return (
        <div>
            <FormWrapper>
                <Title>회원가입 창</Title>
                <form>
                    <FormGroup>
                        아이디 입력
                        <StyledInput value={inputIdValue} placeholder="아이디 입력" onChange={ChangeIdHandle}/>
                        <StyledButton type="button" onClick={checkID}>
                            중복 확인
                        </StyledButton>
                    </FormGroup>
                    <FormGroup>
                        닉네임
                        <StyledInput value={inputNameValue} type="text" placeholder="닉네임 입력" onChange={ChangeNameHandle}
                        />
                    </FormGroup>
                    <FormGroup>
                        비밀번호
                        <StyledInput value={inputPWValue} type="password" placeholder="비밀번호 입력" onChange={ChangePWHandle}/>
                    </FormGroup>
                    <FormGroup>
                        비밀번호 확인
                        <StyledInput value={inputPWCValue} type="password" placeholder="비밀번호 확인" onChange={ChangePWCHandle}/>
                    </FormGroup>
                    <FormGroup>
                        휴대번호
                        <StyledInput value={inputPHONEValue} type="text" placeholder="휴대번호 입력" onChange={ChangePHONEHandle}/>
                    </FormGroup>
                </form>
                <StyledButton onClick={signUp}> 가입완료</StyledButton>
            </FormWrapper>
        </div>);

};

// Styled components
const FormWrapper = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const StyledInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;