import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen name="auth/company/register" options={{ headerShown: false }} />
            <Stack.Screen name="auth/user/register" options={{ headerShown: false }} />
            <Stack.Screen name="auth/user/register2" options={{ headerShown: false }} />
            <Stack.Screen name="auth/user/register3" options={{ headerShown: false }} />
            <Stack.Screen name="auth/company/registercompany1" options={{ headerShown: false }} />
            <Stack.Screen name="auth/company/registercompany" options={{ headerShown: false }} />
            <Stack.Screen name="auth/user/login" options={{ headerShown: false }} />
            
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="events/eventProfile" options={{ headerShown: false }} />
        </Stack>
    );
}