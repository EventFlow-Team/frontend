import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import { Feather, FontAwesome } from '@expo/vector-icons'
import Api from '../../services/api';

export default function MainCard({ item, cardWidth, pressable = true, onPress, description = false, buttonText, categories = false, borderButton = false, loading = false }) {
    const [company, setComapany] = useState('');

    const getCompanyById = async () => {
        await Api.get(`/company/${item.companyId}`)
            .then(response => {
                setComapany(response.data.company);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        getCompanyById();
    }, []);

    const cardContent = () => {
        return (
            <View>
                <View style={globalStyles.cardHeader}>
                    <View style={{
                        width: 43,
                        aspectRatio: 1,
                        borderWidth: 1,
                        borderRadius: 100,
                        overflow: 'hidden'
                    }}>
                        <Image source={{ uri: company?.image }} style={{ flex: 1 }} resizeMode="cover" />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ flexShrink: 1, fontWeight: "500", fontSize: 14 }}
                        >
                            {item?.name}
                        </Text>
                        <Text
                            style={{ color: "gray", flexShrink: 1, fontWeight: "400", fontSize: 12 }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {`@${company?.name}`}
                        </Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <ImageBackground source={{ uri: item?.image }} style={{ width: "100%", height: 100 }}>
                            <View style={{ position: "absolute", flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(0, 0, 0, 0.1)", paddingVertical: 3, paddingHorizontal: 10, borderRadius: 20, justifyContent: "center" }}>
                                <FontAwesome name="circle" size={10} color={item.status === "closed" ? "red" : "green"} />
                                <Text style={{ fontSize: 12 }}>{item.status === "closed" ? "Fechado" : "Em andamento"}</Text>
                            </View>
                        </ImageBackground>
                    </View>

                    {buttonText ?
                        <View style={{ marginTop: 10, marginBottom: 15 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                                <TouchableOpacity>
                                    <Feather name='info' size={26} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[borderButton ? styles.borderButton : styles.button, { width: "25%" }]} onPress={onPress}>
                                    {loading ?
                                        <ActivityIndicator size="small" color={borderButton ? globalColors.main : "#fff"} />
                                        :
                                        <Text style={borderButton ? styles.borderButtonText : styles.buttonText}>{buttonText}</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "700", width: "90%", fontSize: 16 }} >{item?.name}</Text>
                                <View style={{ flexDirection: "row", gap: 3 }}>
                                    <Feather name='edit' size={18} color={globalColors.main} />
                                    <Text style={{ color: globalColors.main }}>{item?.userId.length}</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ marginTop: 10, marginBottom: 15, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: "700", fontSize: 16 }} >{item?.name}</Text>
                        </View>
                    }

                    <View style={{ justifyContent: "flex-end", marginBottom: 10 }}>
                        <Text style={styles.text}>INFO</Text>
                        <Text style={styles.text}>{`Dia: ${new Date(item?.startDate).toLocaleDateString()}`}</Text>
                        <Text style={styles.text}>{`Hora: ${new Date(item?.startDate).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - ${new Date(item?.finishDate).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`}</Text>
                    </View>

                    {description &&
                        <View>
                            <Text style={styles.text}>{item?.description}</Text>
                        </View>
                    }

                    {categories &&
                        <></>
                    }
                </ScrollView>
            </View>
        );
    };

    return (
        <>
            {pressable ?
                <TouchableOpacity style={[globalStyles.cardContainer, { marginBottom: 10, width: cardWidth }]} onPress={onPress}>
                    {cardContent()}
                </TouchableOpacity>
                :
                <View style={[globalStyles.cardContainer, { marginBottom: 10, width: cardWidth }]}>
                    {cardContent()}
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: "gray",
        fontWeight: "400",
    },
    button: {
        backgroundColor: globalColors.darkBlue,
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderButton: {
        borderWidth: 1,
        borderColor: globalColors.darkBlue,
        padding: 8,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "600"
    },
    borderButtonText: {
        color: globalColors.darkBlue,
        fontSize: 16,
        fontWeight: "600"
    },
});