import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { fetchProducts, deleteProduct } from '../../api/product';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                onPress: async () => {
                    const success = await deleteProduct(id);
                    if (success) {
                        setProducts(products.filter((item) => item._id !== id));
                    } else {
                        Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
                    }
                },
            },
        ]);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomWidth: 1 }}>
                    <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text style={{ color: 'green' }}>{item.price} VND</Text>

                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                        <Text style={{ color: 'red' }}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

export default ProductList;