import React from "react";
import styled from "styled-components";
import selectData from "../../utils/sql/selectData";
import {useInput} from "../../hooks/useInput";
import {useFormSubmit} from "../../hooks/useFormSubmit";
import {AddInputs} from "../../components/Part";
import {AddContainer} from "../../styles/stylePart";

export const SignUpPage = () => {
    const {handleSubmit} = useFormSubmit('signup')
    // const [inputIdValue, ChangeIdHandle] = useInput('')
    // const [inputNameValue, ChangeNameHandle] = useInput('')
    // const [inputPWValue, ChangePWHandle] = useInput('')
    // const [inputPWCValue, ChangePWCHandle] = useInput('')
    // const [inputPHONEValue, ChangePHONEHandle] = useInput('')
    // const [idCheck, setIdCheck] = useState(false)

    const [inputValue, ChangeHandle,,directInsert] = useInput({
        inputIdValue: '', inputNameValue: '', inputPWValue: '', inputPWCValue: '', inputPHONEValue: '', idCheck: false
    })

    const checkID = async () => {
        console.log('id:', inputValue.inputIdValue);
        const data = await selectData('user', '/select', ['userId'], ['userId'], [inputValue.inputIdValue]);
        directInsert('idCheck',data['success']);
        console.log(inputValue.idCheck);
        alert(data['success'] ? '사용중 ID' : '사용가능');
    };

    const signUp = async () => {
        const data = await handleSubmit({
            id: inputValue.inputIdValue,
            password: inputValue.inputPWValue,
            name: inputValue.inputNameValue,
            checkPassword: inputValue.inputPWCValue,
            phone: inputValue.inputPHONEValue
        });
        console.log(data)
    }


    return (<div>
        <AddContainer>
            <Title>회원가입 창</Title>
            <form>
                <AddInputs label='아이디 입력' value={inputValue.inputIdValue} placeholder='아이디를 입력하세요' name='inputIdValue'
                           onChange={ChangeHandle}/>
                <StyledButton type="button" onClick={checkID}> 중복 확인</StyledButton>
                <AddInputs label='닉네임' value={inputValue.inputNameValue} placeholder='닉네임 입력' name='inputNameValue'
                           onChange={ChangeHandle}/>
                <AddInputs label='비밀번호' value={inputValue.inputPWValue} placeholder='비밀번호 입력' name='inputPWValue'
                           onChange={ChangeHandle}/>
                <AddInputs label='비밀번호 확인' value={inputValue.inputPWCValue} placeholder='비밀번호 확인' name='inputPWCValue'
                           onChange={ChangeHandle}/>
                <AddInputs label='휴대번호' value={inputValue.inputPHONEValue} placeholder='휴대번호를 입력하세요'
                           name='inputPHONEValue' onChange={ChangeHandle}/>
            </form>
            <StyledButton onClick={signUp}> 가입완료</StyledButton>
        </AddContainer>
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


//
// <FormGroup>
//     아이디 입력
//     <StyledInput value={inputValue.inputIdValue} placeholder="아이디 입력" onChange={ChangeHandle}/>
//     <StyledButton type="button" onClick={checkID}>
//         중복 확인
//     </StyledButton>
// </FormGroup>
// <FormGroup>
//     닉네임
//     <StyledInput value={inputValue.inputNameValue} type="text" placeholder="닉네임 입력" onChange={ChangeHandle}
//     />
// </FormGroup>
// <FormGroup>
//     비밀번호
//     <StyledInput value={inputValue.inputPWValue} type="password" placeholder="비밀번호 입력" onChange={ChangeHandle}/>
// </FormGroup>
// <FormGroup>
//     비밀번호 확인
//     <StyledInput value={inputValue.inputPWCValue} type="password" placeholder="비밀번호 확인" onChange={ChangeHandle}/>
// </FormGroup>
// <FormGroup>
//     휴대번호
//     <StyledInput value={inputValue.inputPHONEValue} type="text" placeholder="휴대번호 입력" onChange={ChangeHandle}/>
// </FormGroup>