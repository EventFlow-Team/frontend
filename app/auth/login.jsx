import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import { globalStyles } from "../../styles/globalStyles";
import MainTextInput from "../../components/inputs/mainTextInput";
import MainButton from "../../components/buttons/mainButton";
import Api from "../../services/api";

const loginSchema = yup.object().shape({
    email: yup.string().required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
}).required();

export default function Login() {
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = (data) => {
        setLoading(true);

        Api.post("/auth/login", data)
            .then(async (response) => {
                console.log(response.data);

                const { token } = response.data;
                await AsyncStorage.setItem('jwtToken', token);
                router.replace("(tabs)");
                reset();
            })
            .catch((error) => {
                console.log(error.response.data);
                Toast.show({
                    type: "error",
                    text1: "Erro",
                    text2: error.response.data.msg,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <View>
            <Image source={require("../../assets/imgs/authBackground.png")} style={globalStyles.backgroundLogo} />

            <View style={globalStyles.authContent}>
                <Text style={[globalStyles.welcomeText, { marginBottom: 40 }]}>Bem vindo</Text>

                <View style={{ gap: 15, width: "100%" }}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <MainTextInput placeholder="Email" onChange={onChange} value={value} />
                                {errors.email && <Text style={globalStyles.errorText}>{errors.email.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <MainTextInput placeholder="Senha" onChange={onChange} value={value} hideText={true} />
                                {errors.password && <Text style={globalStyles.errorText}>{errors.password.message}</Text>}
                            </View>
                        )}
                    />
                </View>

                <View style={{ gap: 15, width: "100%", marginTop: 30, marginBottom: 20 }}>
                    <MainButton text="Entrar" onPress={handleSubmit(onSubmit)} loading={loading}/>
                    <MainButton text="voltar" onPress={() => { router.back() }} border={true} />
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