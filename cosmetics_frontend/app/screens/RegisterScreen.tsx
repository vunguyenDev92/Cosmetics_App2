import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { register } from '@/api/auth';
import { StyleSheet } from 'react-native';

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await register({
                email,
                password,
                name: `${firstName} ${lastName}`, // Kết hợp firstname và lastname thành name
                phoneNumber, // Có thể thêm input nếu cần
                address, // Có thể thêm input nếu cần
                avatar: '',
            });
            Alert.alert('Success', 'Registration successful!');
            router.push('/screens/LoginScreen');
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Firstname"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
            />
            <TextInput
                style={styles.input}
                placeholder="Lastname"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
            />
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
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                keyboardType="phone-pad"
                autoCapitalize="none"
                onChangeText={setPhoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                autoCapitalize="none"
                onChangeText={setAddress}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            {/*Do you have an account*/}

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => router.push('/screens/LoginScreen')}>
                    <Text style={styles.linkText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => router.push('/screens/ForgotPasswordScreen')}>
                    <Text style={styles.linkText}>Forgot Password? Reset</Text>
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

export default RegisterScreen;