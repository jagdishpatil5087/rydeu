import { getToken } from '@/src/utils/authStorage';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        const loadToken = async () => {
            const token = await getToken();

            if (token) {
                router.replace('/Home');
            }

        };

        loadToken();
    }, []);

    return (
        <Provider store={store}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" />
                <Stack.Screen name="Home" />
            </Stack>
        </Provider>
    );
}
