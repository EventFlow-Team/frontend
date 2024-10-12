// Código feito pela Luana

import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { globalStyles, globalColors } from "../styles/globalStyles";
import MainButton from "../components/buttons/mainButton";

export default function App() {
    const hasToken = async () => {
        const token = await AsyncStorage.getItem('jwtToken')
        if (token) { router.replace('(tabs)') }
    };

    useEffect(() => {
        hasToken();
    }, []);


    return (
        <View style={styles.container}>
            <Image source={require("../assets/imgs/authBackground.png")} style={globalStyles.backgroundLogo} />

            <View style={globalStyles.authContent}>
                <View style={{ gap: 5, marginBottom: 30, alignItems: "center" }}>
                    <Text style={globalStyles.welcomeText}>Bem vindo</Text>
                    <Text style={globalStyles.signupText}>Faça seu cadastro ou login</Text>
                </View>

                <View style={{ width: "100%", gap: 15, marginBottom: 20 }}>
                    <MainButton text="Usuário" onPress={() => { router.navigate("/auth/user/register") }} />
                    <MainButton text="Empresa" onPress={() => { router.navigate("/auth/company/register") }} />
                    <MainButton text="Entrar" onPress={() => { router.navigate("/auth/login") }} border={true} />
                </View>

                <Text style={globalStyles.footerText}>Entrar usando</Text>

                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>G</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: globalColors.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 20,
    },
});