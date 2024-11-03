import {useLocation, useNavigate} from "react-router-dom";
import {AddContainer} from "../styles/stylePart";
import styled from "styled-components";
import {useState} from "react";
import Cookies from "js-cookie";
import {userPostApi} from "../apis/api/user";

export const DetailPage = (props) => {
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const location = useLocation();
    let {bookData} = location.state || {}; // 전달된 데이터 가져오기
    console.log(bookData);

    const addToCart = () => {
        // 장바구니에 추가하는 로직을 여기에 작성
        let count = prompt(`장바구니에 추가할 수량 입력 ${bookData.quantity}개 가능`)
        if (count > bookData.quantity) {
            alert('수량 다시 확인')
            count = 0

        }
        setState(count)
        console.log(count, state)
    };

    const cartIn = async () => {
        const addCart = await userPostApi('insert', `cart`, [`bookId`, `userId`, `orderCount`], [bookData.bookId, Cookies.get('id'), state]) // 장바구니 추가
        console.log(addCart, 'dhkfy')
        if (addCart.success) {
            alert('추가완료')
            navigate('/main/main')

        }
    }
    const directOrder = async () => {
        bookData = {...bookData, count: state}
        console.log(bookData, '확인')

        navigate('/main/order', {state: {data: bookData, total: bookData.price * state, req: 'direct'}})
    }

    return (
        <div style={{textAlign: "center", marginTop: "60px"}}>
            <h1>책 상세 정보</h1>
            <StyledAddContainer>
                {bookData ? (
                    <StyledBookDetails>
                        <StyledBookImage
                            src={bookData.bookUrl ? bookData.bookUrl : "https://i.pinimg.com/originals/79/15/f6/7915f60173afe97a81195d4a7759d752.jpg"}
                            alt={bookData.name}
                        />
                        <StyledBookInfo>
                            <h2>{bookData.name}</h2>
                            <p>제품번호: {bookData.bookId}</p>
                            <p>가격: {bookData.price}₩</p>
                            <p>수량: {bookData.quantity}</p>
                            <hr/>
                            <Story>줄거리: {bookData.story}</Story>

                            <AddToCartButton onClick={addToCart}>{state > 0 ? '수량변경' : '구매하기'}</AddToCartButton>
                            {state > 0 ?
                                <div>
                                    <AddToCartButton onClick={directOrder}>{state}개 바로 구매하기</AddToCartButton>
                                    <AddToCartButton onClick={cartIn}>{state}개 장바구니 담기</AddToCartButton>
                                </div> : ""
                            }
                        </StyledBookInfo>

                    </StyledBookDetails>
                ) : (
                    <p>책 정보를 불러오는 중입니다...</p>
                )}
            </StyledAddContainer>
        </div>
    );
};

// 스타일 컴포넌트 정의
const StyledAddContainer = styled(AddContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh; /* 전체 높이 설정 */
`;

const StyledBookDetails = styled.div`
  display: flex;
  align-items: flex-start; /* 위쪽 정렬 */
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledBookImage = styled.img`
  width: 400px; /* 이미지 크기 조절 */
  height: 500px;
  border-radius: 10px;
  margin-right: 20px; /* 오른쪽 여백 추가 */
`;

const StyledBookInfo = styled.div`
  text-align: left; /* 왼쪽 정렬 */
  color: #333;

  h2 {
    font-size: 24px;
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
    width: 450px;
  }
`;

const Story = styled.div`
  margin: 5px 0;
  width: 450px;
  font-weight: bolder;
  font-size: 18px;
`;

// 버튼 스타일
const AddToCartButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px; /* 위쪽 여백 추가 */

  &:hover {
    background-color: #0056b3;
  }
`;
