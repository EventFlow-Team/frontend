// Código feito pela Luana

import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

import { globalStyles, globalColors } from "../styles/globalStyles";
import MainButton from "../components/buttons/mainButton";

export default function App() {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/imgs/authBackground.png")} style={globalStyles.backgroundLogo} />

            <View style={globalStyles.authContent}>
                <View style={{ gap: 5,marginBottom: 30, alignItems: "center" }}>
                    <Text style={globalStyles.welcomeText}>Bem vindo</Text>
                    <Text style={globalStyles.signupText}>Faça seu cadastro ou login</Text>
                </View>
                
                <View style={{ width: "100%", gap: 15, marginBottom: 20 }}>
                    <MainButton text="Usuário" onPress={() => { router.navigate("/auth/user/register") }} />
                    <MainButton text="Empresa" onPress={() => { router.navigate("/auth/company/register") }} />
                    <MainButton text="Entrar" onPress={() => { router.navigate("/auth/user/login") }} border={true} />
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