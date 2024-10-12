import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { UserProvider } from "../services/contexts/userContext";
import { PermissionProvider } from "../services/contexts/permissionContext";

export default function Layout() {
    return (
        <>
            <PermissionProvider>
                <UserProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />

                        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                        <Stack.Screen name="auth/user/register" options={{ headerShown: false }} />
                        <Stack.Screen name="auth/company/register" options={{ headerShown: false }} />
                        <Stack.Screen name="auth/company/register1" options={{ headerShown: false }} />

                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                        <Stack.Screen name="events/eventProfile" options={{ headerShown: false }} />
                    </Stack>
                </UserProvider>
            </PermissionProvider>
            <Toast />
        </>
    );
}