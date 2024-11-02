import styled from 'styled-components';
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import Cookies from "js-cookie";
import {userPostApi} from "../apis/api/user";
import {bookDataAtom} from "../recoil/atoms/bookDataAtom";
import {useNavigate} from "react-router-dom";

export const CartPage = ({onUpdate}) => {
    const bookList = useRecoilValue(bookDataAtom);
    const [cartData, setCartData] = useState([]);
    const [totalMoney, setTotalMoney] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const userId = Cookies.get('id');
        const cartPageData = async () => {
            if (userId) {
                try {
                    const cart = await userPostApi('cart', ['*'], ['userId'], [userId]);
                    const mergedData = cart.data[1].map((data) => {
                        const matchedBook = bookList.find(book => book.bookId === data.bookId);
                        return {
                            ...data,
                            bookDetails: matchedBook || {}
                        };
                    });
                    setCartData(mergedData);
                    // 총 금액 계산
                    const calculatedTotalMoney = mergedData.reduce((total, item) => {
                        const price = item.bookDetails.price || 0;
                        return total + price * item.orderCount;
                    }, 0);
                    setTotalMoney(calculatedTotalMoney);
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            } else {
                alert('쿠키 만료, 재 로그인');
            }
        };

        cartPageData();
    }, [bookList]);

    const cartDelete = async (data, index) => { // 취소 눌렸을 때 장바구니 제거
        console.log(data, index, '계산')
        const del = await userPostApi('delete', 'cart', 'cartID', data.cartId);
        console.log(del, "del");

        if (del.data && data.success) { // 카트에서 제거 했을 때
            setTotalMoney(totalMoney - data.bookDetails.price * data.orderCount)
            const updatedCartData = [...cartData];     // 새로운 배열을 생성하여 상태 업데이트
            updatedCartData.splice(index, 1); // index 위치에서 1개의 요소 제거
            setCartData(updatedCartData); // 새로운 배열로 상태 업데이트
            console.log(updatedCartData);
        }
    };

    const buyCart = () => { // 구매하기 눌렸을 때
        let check = prompt(`구매하시겠습니까? 맞다면 "예" 를 입력하세요`)
        if (check === '예') {
            alert('ㅇㅋ')
            navigate('/main/order', {state: {data: cartData, total: totalMoney}})

        }

    }
    const cartUpdate = async (data, index) => {
        const count = prompt(`변경 수량은? 최대 ${data.bookDetails.quantity}개`);
        if (count > data.bookDetails.quantity || count <= 0) {
            alert('똑바로 입력')
        } else {
            const check = await userPostApi('update', `cart`, [[`ordercount`, count]], [`cartId`, data.cartId])
            if (check) {
                window.location.reload() // 강제 재 랜더링
            }
        }
        console.log(data, index)
    }

    return (
        <CartContainer>
            <Title>장바구니</Title>
            <ItemList>
                {cartData.map((data, index) => (
                    <ItemCard key={data.cartId}>
                        <Img
                            src={data.bookDetails.bookUrl ? data.bookDetails.bookUrl : "https://i.pinimg.com/originals/79/15/f6/7915f60173afe97a81195d4a7759d752.jpg"}
                            alt="책 이미지"
                        />
                        <ItemDetail>
                            <BookTitle>{data.bookDetails.name || "책 제목 없음"}</BookTitle>
                            <BookStory>{data.bookDetails.story || "책 설명이 없습니다."}</BookStory>
                            <BookInfo>
                                <OrderDetail> 총 가격: {data.bookDetails.price * data.orderCount}원</OrderDetail>
                                <OrderDetail>주문 수량: {data.orderCount}</OrderDetail>
                                <button onClick={() => cartDelete(data, index)}>취소</button>
                                <button onClick={() => {
                                    cartUpdate(data, index)
                                }}>수량 변경
                                </button>
                            </BookInfo>
                        </ItemDetail>
                        <OrderInfo>
                            <OrderDetail>담은 시간: {new Date(data.time).toLocaleDateString()}</OrderDetail>
                        </OrderInfo>
                    </ItemCard>
                ))}
            </ItemList>
            총가격:{totalMoney}
            <button onClick={buyCart}>구매하기</button>
        </CartContainer>
    );
};

// Styled components
const CartContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 20px 0px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ItemDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BookTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const BookStory = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const BookInfo = styled.div`
  font-size: 14px;
  color: #333;
  display: flex;
  gap: 15px;
`;

const OrderInfo = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const OrderDetail = styled.span`
  font-size: 14px;
  color: #555;
`;
const Img = styled.img`
  width: 250px;
  height: 180px;
  object-fit: cover;

  &:hover {
    cursor: pointer;
  }
`;
export default CartPage;
