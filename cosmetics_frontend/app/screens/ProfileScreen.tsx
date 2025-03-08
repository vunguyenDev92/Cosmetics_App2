import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Avatar, Text, IconButton, Card, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ui/screensWrapper';
import BackButton from '@/components/ui/backButton';
import { apiCall } from '@/utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    avatar?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ProfileOption {
    id: string;
    title: string;
    path?: string;
}

const profileOptions: ProfileOption[] = [
    { id: '1', title: 'Address', path: '/address' },
    { id: '2', title: 'Wishlist', path: '/wishlist' },
    { id: '3', title: 'Payment', path: '/payment' },
    { id: '4', title: 'Help', path: '/help' },
    { id: '5', title: 'Support', path: '/support' },
];

const ProfileScreen = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('access_token');
                if (!token) throw new Error('No token found');

                const fetchedUser = await apiCall<User>('/auth/profile', 'GET', null); // Sử dụng API_URL từ env
                setUser(fetchedUser);
            } catch (error: any) {
                Alert.alert('Error', error.message || 'Failed to load profile');
                if (error.message === 'Authentication failed') {
                    await AsyncStorage.clear();
                    router.push('/screens/LoginScreen');
                }
            }
        };
        loadUserData();
    }, [router]);

    const renderItem = ({ item }: { item: ProfileOption }) => (
        <TouchableOpacity
            style={styles.optionItem}
            onPress={() => item.path && router.push(item.path as any)}
        >
            <Text variant="bodyLarge">{item.title}</Text>
            <IconButton icon="chevron-right" size={24} />
        </TouchableOpacity>
    );

    const handleSignOut = async () => {
        await AsyncStorage.clear();
        router.push('/screens/LoginScreen');
    };

    return (
        <ScreenWrapper bg="#f0f0f0">
            <View style={styles.container}>
                <BackButton />
                <Card style={styles.card}>
                    <View style={styles.header}>
                        <Avatar.Image
                            size={60}
                            source={{ uri: user?.avatar || 'https://via.placeholder.com/50' }}
                        />
                        <View style={styles.userInfo}>
                            <Text variant="titleLarge" style={styles.name}>
                                {user?.name || 'Loading...'}
                            </Text>
                            <Text variant="bodyMedium" style={styles.detail}>
                                {user?.email || 'N/A'}
                            </Text>
                            <Text variant="bodyMedium" style={styles.detail}>
                                {user?.phoneNumber || 'N/A'}
                            </Text>
                        </View>
                        <Button mode="text" onPress={() => { }} textColor="#6200EE">
                            Edit
                        </Button>
                    </View>
                </Card>

                <FlatList
                    data={profileOptions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                />

                <Link href="/" asChild>
                    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                        <Text variant="bodyLarge" style={styles.signOutText}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    card: {
        margin: 10,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        marginLeft: 15,
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
    },
    detail: {
        color: '#757575',
    },
    list: {
        marginVertical: 10,
    },
    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    signOutButton: {
        margin: 20,
        paddingVertical: 15,
        alignItems: 'center',
    },
    signOutText: {
        color: '#FF0000',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;