import {Center} from "../styles/stylePart";
import styled from "styled-components";
import {useInput} from "../hooks/useInput";
import {Link} from "react-router-dom";
import bookList from "../utils/bookList";
import {useEffect} from "react";
import {bookDataAtom, inputResult} from "../recoil/atoms/bookDataAtom";
import {useSetRecoilState} from "recoil";

const Header = () => {
    const [data, setData] = useInput({
        searchData: '', bookLists: ''
    });
    const setGlobalBookData = useSetRecoilState(bookDataAtom);
    const setFilterVal = useSetRecoilState(inputResult);

    useEffect(() => {
        bookList().then(a => {
            setGlobalBookData(a); // 전역 상태 업데이트
        });
    }, []);

    const handleInputChange = (e) => {
        setData(e); // 입력 상태 업데이트
        setFilterVal(e.target.value); // Recoil 전역 상태 업데이트
    };

    return (
        <div>
            <Container>
                <Center>
                    <HeaderTop>
                        <Link to='/main/main'>
                            <div>책 사줘! 시스템</div>
                        </Link>
                        <Input
                            type="text"
                            name='searchData'
                            value={data.searchData}
                            onChange={handleInputChange} // 함수로 설정
                        />
                    </HeaderTop>
                </Center>
                <HeaderBtnDiv>
                    <Link to='/main/addcard'><HeaderBtn>카드등록</HeaderBtn></Link>
                    <Link to='/main/addAddress'><HeaderBtn>주소등록</HeaderBtn></Link>
                    <Link to='/main/addBook'><HeaderBtn>책 등록</HeaderBtn></Link>
                    <Link to='/'><HeaderBtn>myPage</HeaderBtn></Link>
                </HeaderBtnDiv>
            </Container>
        </div>
    );
};

//* styled component
const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: #a1c7c7;
`;

const HeaderBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: baseline;
  width: 100%;
`;

const HeaderBtn = styled.div`
  &:hover {
    transition: background-color 0.4s ease-in-out;
    background-color: aqua;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: calc(60% - 50px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
`;

export default Header;
