import axios from 'axios';
import { API_URL } from '@/config/env'; // Sử dụng API_URL từ env.ts

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

export const register = async (userData: {
    email: string;
    password: string;
    name?: string;
    phoneNumber?: string;
    address?: string;
    avatar?: string;
}): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const login = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/refresh`, { refresh_token: refreshToken });
    return response.data;
};

export const fetchUserById = async (token: string): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};