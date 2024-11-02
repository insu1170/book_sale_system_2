import {bookDataAtom, inputResult} from "../recoil/atoms/bookDataAtom";
import {useRecoilValue} from "recoil";

export const useBookListAPI = () => {
    const bookList = useRecoilValue(bookDataAtom);
    const filterVal = useRecoilValue(inputResult)
    return {
        allList: () => bookList,
        filterName: (filterVal) => bookList.filter(book => book.name.includes(filterVal))
    };
};
