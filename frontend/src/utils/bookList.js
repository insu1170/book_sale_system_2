import {userGetApi} from "../apis/api/user";

const fetchBookData = async () => {
    try {
        const response = await userGetApi('bookselect', ['book'], ['*']);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching book data:", error);
        return null; // 실패 시 null 반환
    }
};

export default fetchBookData;
