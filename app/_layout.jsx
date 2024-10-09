import { Stack } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function Layout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />

                <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                <Stack.Screen name="auth/user/register" options={{ headerShown: false }} />
                <Stack.Screen name="auth/user/register2" options={{ headerShown: false }} />
                <Stack.Screen name="auth/user/register3" options={{ headerShown: false }} />
                <Stack.Screen name="auth/company/register" options={{ headerShown: false }} />
                <Stack.Screen name="auth/company/register1" options={{ headerShown: false }} />

                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                <Stack.Screen name="events/eventProfile" options={{ headerShown: false }} />
            </Stack>
            <Toast />
        </>
    );
}