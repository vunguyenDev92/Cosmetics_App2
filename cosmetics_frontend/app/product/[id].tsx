import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Card } from "react-native-paper";
import ScreensWrapper from "@/components/ui/screensWrapper";
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import BackButton from "@/components/ui/backButton";
import { fetchProductById } from "@/api/product"; // ✅ Sử dụng API đã có

const ProductDetail = () => {
    const params = useLocalSearchParams();
    const productId = params?.id;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            loadProductDetails();
        }
    }, [productId]);

    const loadProductDetails = async () => {
        setLoading(true);
        const data = await fetchProductById(productId as string);
        setProduct(data);
        setLoading(false);
    };

    const handleAddToCart = () => {
        if (!product) {
            Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng.");
            return;
        }

        const cartItem = {
            productId: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
        };

        setCartLoading(true);
        dispatch(addToCart(cartItem));
        setTimeout(() => {
            setCartLoading(false);
            Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng.");
        }, 1000);
    };

    if (loading) {
        return (
            <ScreensWrapper bg="#fff">
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
            </ScreensWrapper>
        );
    }

    return (
        <ScreensWrapper bg="white">
            <ScrollView>
                <BackButton />
                <Card style={{ margin: 10 }}>
                    <Card.Cover source={{ uri: product.imageUrl }} />
                    <Card.Title title={product.name} />
                    <Card.Content>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>
                            {product.price} VND
                        </Text>
                        <Text style={{ marginTop: 10 }}>{product.description}</Text>
                    </Card.Content>
                </Card>

                <TouchableOpacity
                    onPress={handleAddToCart}
                    style={{
                        backgroundColor: "#FF5722",
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                        margin: 20,
                    }}
                >
                    {cartLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Add to Cart</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </ScreensWrapper>
    );
};

export default ProductDetail;
