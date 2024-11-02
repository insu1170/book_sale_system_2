import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {userPostApi} from "../../apis/api/user";
import Cookies from "js-cookie";
import styled from "styled-components";

export const OrderPage = () => {
    const userID = Cookies.get('id');
    const location = useLocation();
    const [cardData, setCardData] = useState(null);
    const [addressData, setAddressData] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

    useEffect(() => {
        Promise.all([
            userPostApi('card', ['*'], ['userId'], [userID]),
            userPostApi('address', ['*'], ['userId'], [userID])
        ])
            .then(([cardResponse, addressResponse]) => {
                console.log('카드:', cardResponse.data[1]);
                setCardData(cardResponse.data[1]);
                console.log('주소:', addressResponse.data[1]);
                setAddressData(addressResponse.data[1]);
            })
            .catch((error) => {
                console.error('에러 발생:', error);
            });
    }, [userID]);

    const buy = () => {
        if (selectedCardIndex === null || selectedAddressIndex === null) {
            alert("카드와 배송지를 선택해주세요.");
            return;
        }

        const selectedCard = cardData[selectedCardIndex];
        const selectedAddress = addressData[selectedAddressIndex];

        console.log("선택된 카드 정보:", selectedCard);
        console.log("선택된 주소 정보:", selectedAddress);
        console.log("총 결제 금액:", location.state.total);

        // 결제 로직을 여기에 추가
    };

    return (
        <Container>
            <OrderPageWrapper>
                <SectionTitle>카드</SectionTitle>
                <CardList>
                    {cardData ? cardData.map((data, index) => (
                        <RadioLabel key={index}>
                            <RadioInput
                                type="radio"
                                name="selectedCard"
                                value={index}
                                checked={selectedCardIndex === index}
                                onChange={() => setSelectedCardIndex(index)}
                            />
                            카드번호: {data.cardNum} 카드종류: {data.cardOption}
                        </RadioLabel>
                    )) : "Loading..."}
                </CardList>

                <SectionTitle>배송지</SectionTitle>
                <AddressList>
                    {addressData ? addressData.map((data, index) => (
                        <RadioLabel key={index}>
                            <RadioInput
                                type="radio"
                                name="selectedAddress"
                                value={index}
                                checked={selectedAddressIndex === index}
                                onChange={() => setSelectedAddressIndex(index)}
                            />
                            주소지: [{data.postNum}] {data.normalAdd}, {data.detailAdd}
                        </RadioLabel>
                    )) : "Loading..."}
                </AddressList>

                <PaymentButton onClick={buy}>{location.state.total}원 결제하기</PaymentButton>
            </OrderPageWrapper>
        </Container>
    );
};
const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  background-color: #f5f5f5;
`;

const OrderPageWrapper = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5em;
  color: #333;
`;

const CardList = styled.div`
  margin-bottom: 20px;
`;

const AddressList = styled.div`
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const PaymentButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;