import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import Api from '../../services/api';

export default function LineCard({
    item,
    onPress,
    loading = false,
    imageHeight = 200,
    buttonText,
    cardWidth = "95%",
    currentUserId, 
}) {
    const [company, setCompany] = useState({});
    const [stand, setStand] = useState({});
    const [event, setEvent] = useState({});

    const getCompanyById = async () => {
        try {
            const response = await Api.get(`/company/${item.companyId}`);
            setCompany(response.data.company);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const getStandById = async () => {
        try {
            const response = await Api.get(`/stand/${item.standId}`);
            setStand(response.data.stand);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const getEventById = async () => {
        try {
            const response = await Api.get(`/event/${stand.eventId}`);
            setEvent(response.data.event);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if (item.companyId) {
            getCompanyById();
        }
        if (item.standId) {
            getStandById();
        }
    }, [item]);

    useEffect(() => {
        if (stand.eventId) {
            getEventById();
        }
    }, [stand.eventId]);

    const timeEstimate = () => {
        const numUsers = item?.userId?.length || 0;
        const groupSize = item?.group || 1;
        const timePerGroup = item?.timeEstimate || 0;

        const groupsAhead = Math.ceil(numUsers / groupSize);

        const estimatedTime = groupsAhead * timePerGroup;

        return estimatedTime;
    };

    // Função para verificar se é a vez do usuário
    const isUserTurn = () => {
        if (!item?.userId || !currentUserId) return false;

        const currentGroupIndex = Math.floor(item?.userId.length / item?.group);
        const currentGroup = item?.userId.slice(currentGroupIndex * item?.group, (currentGroupIndex + 1) * item?.group);

        return currentGroup.includes(currentUserId);
    };

    return (
        <View style={[globalStyles.cardContainer, { marginBottom: 10, width: cardWidth, elevation: 5 }]}>
            <View style={globalStyles.cardHeader}>
                <View style={{
                    width: 43,
                    aspectRatio: 1,
                    borderWidth: 1,
                    borderRadius: 100,
                    borderColor: "rgba(0, 0, 0, 0.3)",
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
                        {event?.name}
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

            <ScrollView>
                <View>
                    <ImageBackground source={{ uri: stand?.image }} style={{ width: "100%", height: imageHeight, justifyContent: "flex-end" }} >
                        <View style={{ backgroundColor: globalColors.main, padding: 10 }}>
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>{`Stand ${stand?.name}`}</Text>
                            <Text style={{ color: "#fff", fontSize: 12 }}>{`Estimativa atual da fila - ${timeEstimate()}min`}</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                            <Text style={{ fontWeight: "700", fontSize: 16 }} >{item?.name}</Text>
                            <TouchableOpacity style={styles.button} onPress={onPress}>
                                {loading ?
                                    <ActivityIndicator size="small" color="#fff" />
                                    :
                                    <Text style={styles.buttonText}>{buttonText}</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ gap: 5, marginBottom: 10 }}>
                        <Text>Andamento</Text>

                        <View style={{ width: "100%", borderWidth: 4, borderRadius: 5, borderColor: "rgba(0, 0, 0, 0.3)" }}></View>

                        {item?.steps?.map((step, index) => (
                            <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <FontAwesome name="circle" size={10} color="gray" />
                                <Text style={styles.text}>{step}</Text>
                            </View>
                        ))}
                    </View>

                    <View>
                        {isUserTurn() ? (
                            <Text style={{ color: "green", fontWeight: "700", marginTop: 10 }}>É a sua vez!</Text>
                        ) : (
                            <Text style={{ color: globalColors.main }}>Aguardando os próximos grupos...</Text>
                        )}
                        <Text style={{ color: globalColors.main }}>{`Faltam ${Math.ceil(item?.userId.length / item?.group)} grupos`}</Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(0, 0, 0, 0.6)", paddingVertical: 3, paddingHorizontal: 10, borderRadius: 20, justifyContent: "center", margin: 5 }}>
                            <FontAwesome name="circle" size={10} color={stand?.status === "closed" ? "red" : "lightgreen"} />
                            <Text style={{ fontSize: 12, color: "#fff", fontWeight: "500" }}>{stand?.status === "closed" ? "Fechado" : "Em andamento"}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
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
        justifyContent: 'center',
        width: "25%",
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
    title: {
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 5
    }
});
