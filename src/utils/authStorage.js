import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const saveToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const saveUser = async (user) => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
};

export const getUser = async () => {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const clearAuth = async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
};
