// Código feito pela Luana

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const handleLogout = () => {
        AsyncStorage.removeItem('jwtToken');
        router.replace("auth/login");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{ fontSize: 28, fontWeight: "500", color: "gray" }}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});