import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

// Placeholder API call (chưa có backend, bạn cần triển khai)
const resetPassword = async (email: string) => {
    // Thêm logic gửi email reset password
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleResetPassword = async () => {
        try {
            await resetPassword(email);
            Alert.alert('Success', 'Password reset email sent!');
            router.push('/screens/LoginScreen');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to reset password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => router.push('/screens/LoginScreen')}>
                    <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#8A4AF3',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    linkText: {
        color: '#8A4AF3',
        marginVertical: 5,
    },
});

export default ForgotPasswordScreen;