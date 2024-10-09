import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button,} from "react-native";
import { router } from "expo-router";


import { globalStyles } from "../../../styles/globalStyles";
import MainButton from "../../../components/buttons/mainButton";
import MainTextInput from "../../../components/inputs/mainTextInput";

export default function UserRegister() {
    const handleSubmit = async () => {
        alert("Usário criado com sucesso!");
        router.navigate("/auth/user/register2");
        
    }
    

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={require("../../../assets/imgs/authBackground.png")} style={globalStyles.backgroundLogo} />

            
                <View style={globalStyles.authContent}>
                    <View style={{ marginBottom: 40, alignItems: "center" }}>
                        <Text style={globalStyles.welcomeText}>Termine seu cadastro</Text>
                        <Text style={{ color: "gray", fontWeight: 500 }}>Adicione uma foto de perfil clicando no astronauta.</Text>
                    </View>

                    <View style={styles.input}>
                        
                        <Image source={"../../../assets/imgs/astronauta.png"} style={{marginVertical:70, width: 100, height: 100, borderRadius: 50, alignSelf: 'center'}}/>
                        
                        
                        

                    </View>

                    

                    <View style={{ width: "100%", marginTop: 30 }}>
                        <MainButton text="Finalizar" onPress={() => { router.replace("(tabs)") }} border={true} />
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

    input: {
        borderRadius: 10,
        borderStyle: "dashed",
        borderColor: "#0766cf",
        borderWidth: 2,
        width: "100%",
        height: 251,
    },

    btnupload: {
        borderRadius: 10,
        borderStyle: "dotted",
        borderColor: "#0766cf",
        borderWidth: 1,
        width: "40%",
        marginHorizontal:91,
        marginTop:43,
        height: 27
    },
});