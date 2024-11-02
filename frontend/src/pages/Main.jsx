import React from 'react';
import {AddContainer} from "../styles/stylePart";
import {bookDataAtom, inputResult} from "../recoil/atoms/bookDataAtom";
import {useRecoilValue} from "recoil";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import newTime from "../utils/times";
import {userPostApi} from "../apis/api/user";

export const Main = () => {
    const bookList = useRecoilValue(bookDataAtom);
    const filterVal = useRecoilValue(inputResult);
    const bookData = bookList ? bookList.filter(book => book.name.includes(filterVal)) : bookList;
    const navigate = useNavigate();

    const addCart = async (data) => {
        console.log(data, '정보');
        let count = prompt(`장바구니에 추가할 수량 입력 ${data.quantity}개 가능`)
        if (count > data.quantity) {
            alert('수량 다시 확인')
            count = 0
        }
        console.log(count, Cookies.get('id'), newTime)
        if (!Cookies.get('id')) {
            alert('쿠키만료 다시 로그인')
        }
        if (count > 0) { //유저 id 쿠키에 저장하자
            await userPostApi('insert', `cart`, [`bookId`, `userId`, `orderCount`, `time`], [data.bookId, Cookies.get('id'), count, newTime])

            // await userPostApi('update', `book`, [[`quantity`, data.quantity - count]], [`bookId`, data.bookId]) <- 주문 완료 후에 넣자//

            //UPDATE `booksalesystem`.`book` SET `quantity` = '49' WHERE (`bookId` = '123');
        }
    };

    const detailBook = (data) => {
        navigate('/main/detail', {state: {bookData: data}})
    }

    return (
        <AddContainer>
            <h1>메인 화면</h1>
            <ListMain>
                {bookData ? bookData.map((data) => (
                    <ProductCard key={data.bookId}>
                        <Img onClick={() => detailBook(data)}
                             src={data.bookUrl ? data.bookUrl : "https://i.pinimg.com/originals/79/15/f6/7915f60173afe97a81195d4a7759d752.jpg"}
                             alt="책 이미지"
                        />
                        <ProductDetails>
                            <ProductName>{data.name}</ProductName>
                            <ProductInfo>제품번호: {data.bookId}</ProductInfo>
                            <ProductInfo>가격: {data.price}₩</ProductInfo>
                            <ProductInfo>수량: {data.quantity}</ProductInfo>
                            <AddToCartButton onClick={() => addCart(data)}>장바구니에 추가</AddToCartButton>
                        </ProductDetails>
                    </ProductCard>
                )) : '책 데이터가 없습니다.'}

            </ListMain>
        </AddContainer>
    );
}

// styled-components
const ListMain = styled.div`
  display: flex;
`;

const ProductCard = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Hidden = styled.div`
  display: none;

`

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;

  &:hover {
    cursor: pointer;
  }
`;

const ProductDetails = styled.div`
  padding: 10px;
  text-align: center;
`;

const ProductName = styled.h2`
  font-size: 16px;
  margin: 10px 0;
`;

const ProductInfo = styled.p`
  margin: 5px 0;
  color: #555;
`;

const AddToCartButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;
