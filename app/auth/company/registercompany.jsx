import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";


import { globalStyles } from "../../../styles/globalStyles";
import MainButton from "../../../components/buttons/mainButton";
import MainTextInput from "../../../components/inputs/mainTextInput";

export default function UserRegister() {
    const handleSubmit = async () => {
        alert("Usário criado com sucesso!");
        router.navigate("/auth/company/registercompany1");
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={require("../../../assets/imgs/authBackground.png")} style={globalStyles.backgroundLogo} />

            
                <View style={globalStyles.authContent}>
                    <View style={{ marginBottom: 40, alignItems: "center" }}>
                        <Text style={globalStyles.welcomeText}>Faça seu cadastro</Text>
                        <Text style={{ color: "gray", fontWeight: 500 }}>Preencha todos os campos</Text>
                    </View>

                    <MainTextInput placeholder="Nome da empresa" />
                    <MainTextInput placeholder="CNPJ" />
                    <MainTextInput placeholder="Email" />
                    <MainTextInput placeholder="Senha" />
                    <MainTextInput placeholder="Confirmar senha" />

                    <View style={{ width: "100%", marginTop: 30 }}>
                        <MainButton text="Continuar" onPress={handleSubmit} border={true} />
                        <TouchableOpacity onPress={() => { router.navigate("/auth/company/registercompany1")}}/>
                    </View>

                    <View style={{ flexDirection: "row", gap: 5, marginTop: 15, justifyContent: "center" }}>
                        <Text style={globalStyles.footerText}>Já possui uma conta?</Text>
                        <TouchableOpacity onPress={() => { router.navigate("/auth/user/login") }}>
                            <Text style={[globalStyles.footerText, { fontWeight: 500, textDecorationLine: "underline" }]}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        textAlign: "center",
        fontSize: 12,
        marginBottom: 15
    },
});