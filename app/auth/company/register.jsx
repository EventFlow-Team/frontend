import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";

import { globalStyles } from "../../../styles/globalStyles";
import MainButton from "../../../components/buttons/mainButton";
import MainTextInput from "../../../components/inputs/mainTextInput";

export default function UserRegister() {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        alert("Usuário criado com sucesso!");
        router.navigate("/auth/company/register1");
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

                    <View style={globalStyles.controllerContainer}>
                        <Controller
                            control={control}
                            name="companyName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <MainTextInput
                                    placeholder="Nome da empresa"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="cnpj"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <MainTextInput
                                    placeholder="CNPJ"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <MainTextInput
                                    placeholder="Email"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <MainTextInput
                                    placeholder="Senha"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <MainTextInput
                                    placeholder="Confirmar senha"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry
                                />
                            )}
                        />
                    </View>

                    <View style={{ width: "100%", marginTop: 30, gap: 15 }}>
                        <MainButton text="Continuar" onPress={handleSubmit(onSubmit)} />
                        <MainButton text="Voltar" onPress={() => router.back()} border={true} />
                        <TouchableOpacity onPress={() => { router.navigate("/auth/company/register1") }} />
                    </View>

                    <View style={{ flexDirection: "row", gap: 5, marginTop: 15, justifyContent: "center" }}>
                        <Text style={globalStyles.footerText}>Já possui uma conta?</Text>
                        <TouchableOpacity onPress={() => { router.navigate("/auth/login") }}>
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