import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://192.168.1.42:3000", // Đảm bảo đúng URL
    timeout: 10000,
});