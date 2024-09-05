import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { globalStyles } from "../../../styles/globalStyles";
import MainTextInput from "../../../components/inputs/mainTextInput";
import MainButton from "../../../components/buttons/mainButton";
import { router } from "expo-router";

export default function Login() {
    return (
        <View>
            <Image source={require("../../../assets/imgs/authBackground.png")} style={globalStyles.backgroundLogo} />

            <View style={globalStyles.authContent}>
                <Text style={[globalStyles.welcomeText, { marginBottom: 40 }]}>Bem vindo</Text>

                <MainTextInput placeholder="Email ou CNPJ" />
                <MainTextInput placeholder="Senha" />

                <View style={{ gap: 15, width: "100%", marginTop: 30, marginBottom: 20 }}>
                    <MainButton text="Entrar" onPress={() => { router.replace("(tabs)") }} />
                    <MainButton text="Cadastre-se" onPress={""} border={true} />
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
    textInput: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#0766CF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#007BFF",
        justifyContent: "center",
        alignItems: "center",
    },
    socialButtonText: {
        color: "#fff",
        fontSize: 20,
    },
});