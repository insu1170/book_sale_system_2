import {useInput} from "../../hooks/useInput";
import styled from "styled-components";
import {AddContainer, Center} from "../../styles/stylePart";
import {AddInputs} from "../../components/Part"

export const AddCard = () => {
    // const [cardNum, , doubleCheck] = useInput('');
    // const [cardPeriod, periodChangeHandle] = useInput('');

    const [values, handleChange, doubleCheck] = useInput({
        cardNum: '', cardPeriod: '', // 추가 입력값이 있으면 여기에 설정
    });


    const check = (e) => {
        console.log('Card Type:', e.target.value);
    }

    return (<AddContainer>
        <Center>
            <h1>카드 추가</h1>
        </Center>
        <Center>
            <InputDiv>
                <Label>카드 종류:</Label>
                <RadioGroup>
                    <Label>
                        <RadioInput type="radio" name="cardType" value="checkCard" onChange={check}/>
                        체크카드
                    </Label>
                    <Label>
                        <RadioInput type="radio" name="cardType" value="creditCard" onChange={check}/>
                        신용카드
                    </Label>
                </RadioGroup>
            </InputDiv>
        </Center>

        <AddInputs label="카드 번호:" value={values.cardNum} name='cardNum' onChange={doubleCheck}
                   placeholder='sss'></AddInputs>
        <AddInputs label="유효번호:" value={values.cardPeriod} name='cardPeriod' onChange={handleChange}
                   placeholder='DD/YY'></AddInputs>

        <Center>
            <SubmitButton>등록</SubmitButton>
        </Center>
    </AddContainer>);
}

// Styled Components
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: max(500px, 50vh);
  height: 90px;
`;

const Label = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 600;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const RadioInput = styled.input`
  margin-right: 5px;
  appearance: none;
  width: 1.2em;
  height: 1.2em;
  border: 2px solid #ccc;
  border-radius: 50%;
  vertical-align: middle;
  transition: border 0.5s ease-in-out;

  &:checked {
    background-color: #9191ff;
    border: 2px solid #9191ff;
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #9191ff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #5f5fd4;
  }
`;

export default AddCard;
