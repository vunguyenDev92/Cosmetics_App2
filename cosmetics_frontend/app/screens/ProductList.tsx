import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { fetchProducts } from "../../api/product";
import { Card, Paragraph } from "react-native-paper";
import ScreensWrapper from "@/components/ui/screensWrapper";
import { useRouter } from "expo-router";

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
    const router = useRouter(); // Điều hướng

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
    };

    return (
        <ScreensWrapper bg="#f0f0f0">
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push({ pathname: "/product/[id]", params: { id: item._id } })}>
                        <Card style={{ margin: 10 }}>
                            <Card.Cover source={{ uri: item.imageUrl }} />
                            <Card.Title title={item.name} />
                            <Card.Title title={item._id} />

                            <Card.Content>
                                <Paragraph>{item.description}</Paragraph>
                                <Paragraph style={{ color: "green", fontWeight: "bold" }}>
                                    {item.price} VND
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </ScreensWrapper>
    );
};

export default ProductList;
