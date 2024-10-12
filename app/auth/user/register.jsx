import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import { globalColors, globalStyles } from "../../../styles/globalStyles";
import { Feather } from "@expo/vector-icons";
import { usePermission } from "../../../services/contexts/permissionContext";
import MainButton from "../../../components/buttons/mainButton";
import MainTextInput from "../../../components/inputs/mainTextInput";
import Api from "../../../services/api";

const step1Schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    surname: yup.string().required("Sobrenome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .matches(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
        .matches(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
        .matches(/[0-9]/, 'Senha deve conter pelo menos um número')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter pelo menos um caractere especial')
        .required('Senha é obrigatória'),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Senhas não conferem")
        .required("Confirmação de senha é obrigatória"),
});

const step2Schema = yup.object().shape({
    age: yup
        .string()
        .required('Idade é obrigatória')
        .matches(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            'Data de nascimento inválida'
        ),

    phone: yup
        .string()
        .required('Telefone é obrigatório')
        .matches(
            /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/,
            'Telefone inválido'
        ),
});

const step3Schema = yup.object().shape({
    image: yup.string().optional(),
});

export default function UserRegister() {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("Tire uma foto de seu rosto");
    const [icon, setIcon] = useState("camera");
    const [step, setStep] = useState(1);
    const [image, setImage] = useState(null);

    const { getPermission, permission } = usePermission();

    const schemas = [step1Schema, step2Schema, step3Schema];

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemas[step - 1]),
    });

    const handleNextStep = handleSubmit((data) => {
        if (step < 3) {
            setStep(step + 1);
        }
    });

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const pickImage = async () => {
        await getPermission();

        try {
            if (permission && permission.status === "granted") {
                setText("Tire uma foto de seu rosto");
                setIcon("camera");

                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 1,
                });

                if (!result.canceled && result.assets && result.assets.length > 0) {
                    setImage(result.assets[0].uri);
                    setText("Foto selecionada com sucesso");
                    setIcon("check");
                }
            } else {
                setText("É necessário permitir o acesso a galeria de fotos para está função");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("surname", data.surname);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("age", data.age);
        formData.append("phone", data.phone);
        formData.append("image", data.image = image);

        await Api.post("/user/auth/register", data)
            .then((response) => {
                console.log(response.data);
                reset();
                setStep(1);
                setImage(null);
                router.navigate("/auth/login");
            })
            .catch(error => {
                console.log(error.response.data);
                Toast.show({
                    type: "error",
                    text1: "Erro ao cadastrar",
                    text2: error.response.data.msg,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

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
                        {step === 1 && (
                            <>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <MainTextInput placeholder="Nome" onChange={onChange} value={value} />
                                            {errors.name && <Text style={globalStyles.errorText}>{errors.name.message}</Text>}
                                        </View>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="surname"
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <MainTextInput placeholder="Sobrenome" onChange={onChange} value={value} />
                                            {errors.surname && <Text style={globalStyles.errorText}>{errors.surname.message}</Text>}
                                        </View>
                                    )}
                                />
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
                                <Controller
                                    control={control}
                                    name="confirmPassword"
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <MainTextInput placeholder="Confirmar Senha" onChange={onChange} value={value} hideText={true} />
                                            {errors.confirmPassword && <Text style={globalStyles.errorText}>{errors.confirmPassword.message}</Text>}
                                        </View>
                                    )}
                                />

                                <View style={{ width: "100%", marginTop: 15, gap: 15 }}>
                                    <MainButton text="Continuar" onPress={handleNextStep} />
                                    <MainButton text="Voltar" onPress={() => router.back()} border={true} />
                                </View>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Controller
                                    control={control}
                                    name="age"
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <MainTextInput
                                                placeholder="Data de nascimento"
                                                value={value}
                                                onChange={onChange}
                                                maskType="datetime"
                                                maskOptions={{ format: 'DD/MM/YYYY' }}
                                                keyboardType="numeric"
                                            />

                                            {errors.age && <Text style={globalStyles.errorText}>{errors.age.message}</Text>}
                                        </View>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="phone"
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <MainTextInput
                                                placeholder="Número de telefone"
                                                value={value}
                                                onChange={onChange}
                                                maskType="cel-phone"
                                                maskOptions={{ maskType: 'BRL', withDDD: true }}
                                                keyboardType="numeric"
                                            />
                                            {errors.phone && <Text style={globalStyles.errorText}>{errors.phone.message}</Text>}
                                        </View>
                                    )}
                                />

                                <View style={{ width: "100%", marginTop: 15, gap: 15 }}>
                                    <MainButton text="Continuar" onPress={handleNextStep} />
                                    <MainButton text="Voltar" onPress={handlePrev} border={true} />
                                </View>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <TouchableOpacity style={globalStyles.authImageController} onPress={pickImage}>
                                    <Feather name={icon} size={40} color={globalColors.main} />
                                    <Text style={{ color: globalColors.main, marginTop: 10, textAlign: "center" }}>{text}</Text>
                                </TouchableOpacity>


                                <View style={{ width: "100%", marginTop: 30, gap: 15 }}>
                                    <MainButton text="Finalizar" onPress={handleSubmit(onSubmit)} loading={loading} />
                                    <MainButton text="Voltar" onPress={handlePrev} border={true} />
                                </View>
                            </>
                        )}
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