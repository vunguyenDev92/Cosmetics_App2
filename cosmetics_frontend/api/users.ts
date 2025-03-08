import axios from 'axios';

const API_URL = 'http://192.168.1.135:3000';

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.log('API URL:', API_URL);
        console.error('Error fetching users:', error);
        return [];
    }
};

export const fetchUserById = async (userId: string) => {
    if (!userId) {
        console.error("Error: userId is undefined!");
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        return null;
    }
};

export const deleteUser = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/users/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
};