import {AddContainer, StyledButton} from "../../styles/stylePart";
import {AddInputs} from "../../components/Part";
import {useInput} from "../../hooks/useInput";

export const AddBook = () => {
    const [inputValue, setInputHandle,doubleCheckHandle] = useInput({
        bookId: "", name: '', price: "", quantity: '', imgUrl: '' , doubleCheck:''
    })

    return (<AddContainer>
        <h1>도서 추가 창</h1>
        <AddInputs label='도서번호' name='bookId' onChange={doubleCheckHandle} placeholder='사용 할 제품번호'
                   value={inputValue.bookId} text={inputValue.doubleCheck}></AddInputs>
        <AddInputs label='책 제목' name='name' onChange={setInputHandle} placeholder='책 제목'
                   value={inputValue.name}></AddInputs>
        <AddInputs label='개당 가격' name='price' onChange={setInputHandle} placeholder='제품 가격 개당'
                   value={inputValue.price}></AddInputs>
        <AddInputs label='등록 수량' name='quantity' onChange={setInputHandle} placeholder='등록 할 수량'
                   value={inputValue.quantity}></AddInputs>
        <AddInputs label='제품 이미지' name='imgUrl' onChange={setInputHandle} placeholder='이미지 URL 입력 없을 경우 빈칸 제출'
                   value={inputValue.imgUrl} ></AddInputs>
        <StyledButton>등록하기</StyledButton>
    </AddContainer>)
}