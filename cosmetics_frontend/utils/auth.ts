import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from '@/api/auth';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '@/config/env'; // Sử dụng API_URL từ env.ts

interface TokenPayload {
    email: string;
    sub?: string;
    iat: number;
    exp: number;
}

interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshTokenValue = await AsyncStorage.getItem('refresh_token');
    if (refreshTokenValue) {
        try {
            const response = await refreshToken(refreshTokenValue);
            await AsyncStorage.setItem('access_token', response.access_token);
            await AsyncStorage.setItem('refresh_token', response.refresh_token);
            return response.access_token;
        } catch (error) {
            console.error('Refresh token failed:', error);
            await AsyncStorage.clear();
            return null;
        }
    }
    return null;
};

export const apiCall = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data: any = null,
    customConfig: AxiosRequestConfig = {}
): Promise<T> => {
    let token = await AsyncStorage.getItem('access_token');

    const config: AxiosRequestConfig = {
        url: `${API_URL}${url}`, // Sử dụng API_URL từ env
        method,
        data,
        headers: { Authorization: `Bearer ${token}`, ...customConfig.headers },
        ...customConfig,
    };

    let response: AxiosResponse<T>;
    try {
        response = await axios(config);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            token = await refreshAccessToken();
            if (token) {
                config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
                response = await axios(config);
            } else {
                throw new Error('Authentication failed');
            }
        } else {
            throw error;
        }
    }

    return response.data;
};

export const setupTokenRefresh = () => {
    setInterval(async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        if (accessToken) {
            const decoded = jwtDecode<TokenPayload>(accessToken);
            const exp = decoded.exp * 1000;
            const now = Date.now();

            if (exp - now < 5 * 60 * 1000) {
                await refreshAccessToken();
            }
        }
    }, 60 * 1000);
};

export const initializeAuth = () => {
    setupTokenRefresh();
};