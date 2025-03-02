import axios from 'axios';

const API_URL = 'http://192.168.1.42:3000';


//hi
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.log('API URL:', API_URL);

        console.error('Error fetching products:', error);
        return [];
    }
};

export const deleteProduct = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
};