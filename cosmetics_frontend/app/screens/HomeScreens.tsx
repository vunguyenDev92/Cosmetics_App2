import React, { useState } from "react";
import { View, FlatList, Image } from "react-native";
import { Appbar, Text, Searchbar, Avatar, IconButton } from "react-native-paper";
import ProductList from "./ProductList";

// Fake data cho danh mục sản phẩm
const categories = [
    { id: "1", name: "Hoodies", image: "https://trankimhuyen.com/wp-content/uploads/2022/12/cos-web-2.jpg" },
    { id: "2", name: "Shorts", image: "https://via.placeholder.com/50" },
    { id: "3", name: "Shoes", image: "https://via.placeholder.com/50" },
    { id: "4", name: "Bag", image: "https://via.placeholder.com/50" },
    { id: "5", name: "Accessories", image: "https://via.placeholder.com/50" },
];

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Header của danh sách chính
    const renderHeader = () => (
        <View>
            {/* Thanh tìm kiếm */}
            <View style={{ padding: 10 }}>
                <Searchbar
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ borderRadius: 10 }}
                />
            </View>

            {/* Danh mục sản phẩm */}
            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <Text variant="titleMedium">Categories</Text>
                <FlatList
                    data={categories}
                    horizontal
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: "center", marginHorizontal: 10 }}>
                            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            <Text style={{ marginTop: 5 }}>{item.name}</Text>
                        </View>
                    )}
                />
            </View>

            {/* Top Selling */}
            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <Text variant="titleMedium">Top Selling</Text>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
            {/* App Bar */}
            <Appbar.Header>
                <Avatar.Image size={40} source={{ uri: "https://via.placeholder.com/50" }} />
                <Appbar.Content title="Trang chủ" />
                <IconButton icon="cart-outline" size={24} />
            </Appbar.Header>

            {/* FlatList chính chứa tất cả */}
            <FlatList
                ListHeaderComponent={renderHeader}
                data={[{ key: "products" }]} // Dummy data để giữ FlatList
                keyExtractor={(item) => item.key}
                renderItem={() => <ProductList />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default HomeScreen;
