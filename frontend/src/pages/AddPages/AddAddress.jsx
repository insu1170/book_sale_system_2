import {AddContainer} from "../../styles/stylePart";
import {AddInputs} from "../../components/Part"
import {useInput} from "../../hooks/useInput";
import styled from "styled-components";
import axios from "axios";
import port from "../../utils/port";
import {axiosPost} from "../../utils/axiosPost";

export const AddAddress = () => {
    const [postNum, postNumChangeHandle, FindPostAddress] = useInput('');
    const [normalAdd, normalAddChangeHandle,FindNormalAddress] = useInput('');
    const [detailAdd, detailAddChangeHandle,FindDetailAddress] = useInput('');
    const AddAddress = () => {
        console.log('zmffl');
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
            FindPostAddress(data.data[0])
            FindNormalAddress(data.data[1])
            FindDetailAddress(data.data[2])
        }
    }


    return (<AddContainer>
        <h1>주소 추가 창</h1>
        <AddInputs label='우편번호:' value={postNum} onChange={postNumChangeHandle} placeholder='우편 번호를 입력하세요'
                   buttonText='주소 찾기' onClick={AddAddress}/>
        <AddInputs label='기본주소:' value={normalAdd} onChange={normalAddChangeHandle} placeholder='기본 주소를 입력하세요'/>
        <AddInputs label='상세주소:' value={detailAdd} onChange={detailAddChangeHandle} placeholder='상세주소 입력'/>
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