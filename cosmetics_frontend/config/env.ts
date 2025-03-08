import Constants from 'expo-constants';

// Đọc EXPO_PUBLIC_API_URL từ process.env hoặc extra trong app.json
const API_URL = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
console.log(process.env.EXPO_PUBLIC_API_URL)


export { API_URL };