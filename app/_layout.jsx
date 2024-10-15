import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { UserProvider } from "../services/contexts/userContext";
import { PermissionProvider } from "../services/contexts/permissionContext";
import { UserEventsProvider } from "../services/contexts/userEventsContext";

export default function Layout() {
    return (
        <>
            <UserEventsProvider>
                <PermissionProvider>
                    <UserProvider>
                        <Stack>
                            <Stack.Screen name="index" options={{ headerShown: false }} />

                            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
                            <Stack.Screen name="auth/user/register" options={{ headerShown: false }} />
                            <Stack.Screen name="auth/company/register" options={{ headerShown: false }} />
                            <Stack.Screen name="auth/company/register1" options={{ headerShown: false }} />

                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                            <Stack.Screen name="events/[id]" options={{ headerShown: false }} />
                        </Stack>
                    </UserProvider>
                </PermissionProvider>
            </UserEventsProvider>
            <Toast />
        </>
    );
}