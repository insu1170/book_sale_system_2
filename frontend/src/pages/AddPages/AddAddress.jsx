import {AddContainer} from "../../styles/stylePart";
import {AddInputs} from "../../components/Part"
import {useInput} from "../../hooks/useInput";
import styled from "styled-components";
import axios from "axios";
import port from "../../utils/port";
import {axiosPost} from "../../utils/axiosPost";

export const AddAddress = () => {
    const [values, handleChange, , directInsert] = useInput({
        postNum: '', normalAdd: '', detailAdd: ''
    })
    const AddAddress = () => {
        let searchWindow = window.open("https://business.juso.go.kr/addrlink/addrLinkUrl.do?confmKey=devU01TX0FVVEgyMDI0MDgyMDE3MzY0NTExNTAyMjA=&returnUrl=http://localhost:3001/Address&useDetailAddr=Y", "pop", "width=570,height=420, scrollbars=yes, resizable=yes");
        if (searchWindow) {
            console.log(searchWindow, ':ss');
            clintReq(searchWindow);
        } else {
            alert('검색창을 열수 없습니다');
        }
    }

    const clintReq = async (searchWindow) => {
        const response = await axios.post(`${port}/address`, {}, axiosPost(false));
        const data = response.data;
        if (searchWindow) {
            searchWindow.close();
            directInsert('postNum', data.data[0])
            directInsert('normalAdd', data.data[1])
            directInsert('detailAdd', data.data[2])
        }
    }


    return (<AddContainer>
        <h1>주소 추가 창</h1>
        <AddInputs label='우편번호:' value={values.postNum} onChange={handleChange} placeholder='우편 번호를 입력하세요'
                   buttonText='주소 찾기' onClick={AddAddress} name='postNum'/>
        <AddInputs label='기본주소:' value={values.normalAdd} onChange={handleChange} placeholder='기본 주소를 입력하세요'
                   name='normalAdd'/>
        <AddInputs label='상세주소:' value={values.detailAdd} onChange={handleChange} placeholder='상세주소 입력'
                   name='detailAdd'/>
        <ButtonGroup>
            <StyledButton>등록하기</StyledButton>
        </ButtonGroup>
    </AddContainer>)
}
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #9191ff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #5f5fd4;
  }
`;