import axios from 'axios';

const API_URL = 'http://192.168.1.42:3000';

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

export const fetchProductById = async (productId: string) => {
    if (!productId) {
        console.error("Error: productId is undefined!");
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return null;
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