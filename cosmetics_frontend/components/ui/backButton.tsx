import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icon từ Expo

const BackButton = () => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.back()} // Quay lại màn hình trước
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
            }}
        >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={{ marginLeft: 5, fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
    );
};

export default BackButton;
