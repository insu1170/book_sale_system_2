import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {userPostApi} from "../apis/api/user";
import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {bookDataAtom} from "../recoil/atoms/bookDataAtom";

export const MyPage = () => {
    const bookList = useRecoilValue(bookDataAtom);
    const [orders, setOrders] = useState([]);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const pageInfo = async () => {
            try {
                const postOrder = await userPostApi("order", ["*"], ["userId"], [Cookies.get("id")]);
                const data = postOrder.data[1];
                setOrders(data);

                const orderLists = await Promise.all(
                    data.map(async (order) => {
                        const orderListResponse = await userPostApi('orderList', ['*'], ['orderId'], [order.orderId]);
                        return orderListResponse.data[1];
                    })
                );
                setOrderList(orderLists.flat());
            } catch (error) {
                console.error('주문 정보를 가져오는 중 에러 발생:', error);
            }
        };

        pageInfo();
    }, []);

    return (
        <MyPageContainer>
            <SectionTitle>나의 주문 내역</SectionTitle>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <OrderContainer key={order.orderId}>
                        <OrderHeader>
                            <OrderTitle>주문 번호: {order.orderId}</OrderTitle>
                            <OrderDetails>주문일: {new Date(order.orderDay).toLocaleString()}</OrderDetails>
                            <OrderDetails>결제 방식: {order.cardOption}</OrderDetails>
                            <OrderDetails>주문 상태: {order.orderState}</OrderDetails>
                            <OrderDetails>총 주문 금액: {order.orderTotal}원</OrderDetails>
                            <OrderDetails>배송지: [{order.postNum}] {order.normalAdd}, {order.detailAdd}</OrderDetails>
                        </OrderHeader>
                        <OrderList>
                            {orderList
                                .filter((item) => item.orderId === order.orderId)
                                .map((item) => {
                                    const book = bookList.find((book) => book.bookId === item.bookId);
                                    return (
                                        <OrderItem key={item.orderListKey}>
                                            <IMG
                                                src={book?.bookUrl || "https://i.pinimg.com/originals/79/15/f6/7915f60173afe97a81195d4a7759d752.jpg"}
                                                alt=""/>
                                            <ItemDetails>
                                                <p>책 제목: {book ? book.name : '정보 없음'}</p>
                                                <p>주문 수량: {item.orderTotalCount}</p>
                                                <p>개당 가격: {book ? book.price : '가격정보 없음'}</p>
                                                <p>줄거리: {book ? book.story : '정보 없음'}</p>
                                                {item.returnReason && <p>반품 사유: {item.returnReason}</p>}
                                                {item.returnDay &&
                                                    <p>반품일: {new Date(item.returnDay).toLocaleString()}</p>}
                                            </ItemDetails>
                                        </OrderItem>
                                    );
                                })}
                        </OrderList>
                    </OrderContainer>
                ))
            ) : (
                <NoOrdersMessage>주문 내역이 없습니다.</NoOrdersMessage>
            )}
        </MyPageContainer>
    );
};

// Styled Components

const MyPageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #444;
  font-size: 1.8em;
  margin-bottom: 20px;
  font-weight: bold;
`;

const OrderContainer = styled.div`
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const OrderHeader = styled.div`
  margin-bottom: 10px;
`;

const OrderTitle = styled.h3`
  margin: 0;
  font-size: 1.3em;
  color: #222;
  font-weight: bold;
`;

const OrderDetails = styled.p`
  margin: 5px 0;
  font-size: 0.95em;
  color: #666;
`;

const OrderList = styled.div`
  margin-top: 15px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  border-top: 1px solid #f0f0f0;

  &:first-child {
    border-top: none;
  }
`;

const IMG = styled.img`
  width: 150px;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
`;

const ItemDetails = styled.div`
  p {
    margin: 5px 0;
    font-size: 0.9em;
    color: #555;
  }
`;

const NoOrdersMessage = styled.p`
  text-align: center;
  color: #888;
  font-size: 1em;
  margin-top: 30px;
`;
