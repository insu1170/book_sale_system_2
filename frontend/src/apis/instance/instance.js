import axios from 'axios';

const API_KEY = "http://localhost:3001";
export const instance = axios.create({
    baseURL: API_KEY,
    headers: {
        "Content-Type": "application/json"
    }
});
