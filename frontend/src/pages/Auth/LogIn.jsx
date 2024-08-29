import {Link, Outlet} from "react-router-dom";
import styled from "styled-components"
import {Center, AddContainer} from "../../styles/stylePart";


export const LogIn = () => {


    return (<Container>
        <Center style={{height: '30%'}}>
            <Link to="/login">
                <ChangePageBtn left>로그인</ChangePageBtn>
            </Link>
            <Link to="/signup">
                <ChangePageBtn>회원가입</ChangePageBtn>
            </Link>
        </Center>
        <Center>
            <OutletDiv>
                <Outlet/>
            </OutletDiv>
        </Center>
    </Container>);
}
//---- Style Components ----//
const Container = styled.div`
  background-color: #888888;
  width: 100%;
  height: 100vh;
`
const OutletDiv = styled.div`
  background-color: aliceblue;
  padding: 20px;
  border-radius: 0 0 20px 20px;
`
const ChangePageBtn = styled.button`
  width: 310px;
  height: 40px;
  border: none;
  border-radius: ${(props) => props.left ? '20px 0 0 0' : '0 20px 0 0'};
  border-right: ${(props) => props.left ? '1px solid black' : 'none'};
  cursor: pointer;
  font-size: 15px;
  font-weight: bolder;

  &:hover {
    background-color: #dee7f1;
  }
`;