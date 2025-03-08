import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '@/api/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await login({ email, password }) as LoginResponse;
            await AsyncStorage.setItem('access_token', response.access_token);
            await AsyncStorage.setItem('refresh_token', response.refresh_token);
            router.push('/screens/HomeScreens');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Login failed');
        }
    };

    const handleSocialLogin = (provider: string) => {
        Alert.alert(`Continue with ${provider} is not implemented yet`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Apple')}>
                    <Icon name="apple" size={20} color="#000" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Google')}>
                    <Icon name="google" size={20} color="#4285F4" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('Facebook')}>
                    <Icon name="facebook" size={20} color="#3b5998" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => router.push('/screens/ForgotPasswordScreen')}>
                    <Text style={styles.linkText}>Forgot Password? Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/RegisterScreen')}>
                    <Text style={styles.linkText}>Don't have an account? Create One</Text>
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
    socialContainer: {
        marginVertical: 20,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    socialIcon: {
        marginRight: 10,
    },
    socialButtonText: {
        color: '#000',
        fontSize: 16,
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

export default LoginScreen;