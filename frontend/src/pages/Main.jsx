import {AddContainer} from "../styles/stylePart";
import {bookDataAtom, inputResult} from "../recoil/atoms/bookDataAtom";
import {useRecoilValue} from "recoil";

export const Main = () => {
    const bookList = useRecoilValue(bookDataAtom);
    const filterVal = useRecoilValue(inputResult)
    const bookData = bookList ? bookList.filter(book => book.name.includes(filterVal)) : bookList
    console.log(bookData, 's')
    return (
        <AddContainer>
            <h1>메인 화면</h1>
            <div>
                <AddContainer>
                    {bookData.map((data) => (
                        <div key={data.id}> {/* key prop 추가 (data의 고유 id 값 사용) */}
                            <img
                                src={data.bookUrl ? data.bookUrl : 'https://dimg.donga.com/wps/NEWS/IMAGE/2023/12/10/122564472.2.jpg'}
                                alt=""/>
                            <h1>{data.name}</h1>
                        </div>
                    ))}
                </AddContainer>
            </div>
        </AddContainer>
    );
}
