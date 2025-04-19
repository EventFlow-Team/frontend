import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import Api from '../../services/api';
import MainHeader from '../../components/navBar/mainHeader';
import MainCard from '../../components/cards/mainCard';

export default function EventProfile() {
    const [event, setEvent] = useState({});
    const [stands, setStands] = useState([]);
    const [company, setCompany] = useState({});

    const { id } = useLocalSearchParams();

    const getEventById = async () => {
        await Api.get(`/event/${id}`)
            .then(async response => {
                setEvent(response.data.event);

                await Api.get(`/company/${response.data.event.companyId}`)
                    .then(response => {
                        setCompany(response.data.company);
                    })
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const getStands = async () => {
        await Api.get(`/stand/event/${id}`)
            .then(response => {
                setStands(response.data.stands || []);
            })
            .catch(error => {
                console.log(error.response.data);
                setStands([]);
            });
    }    

    useEffect(() => {
        getEventById();
        getStands();
    }, []);

    useEffect(() => {
        eventRating(); 
    }, [stands]);

    return (
        <View style={{ flex: 1, backgroundColor: globalColors.main }}>
            <MainHeader title={"Detalhes do Evento"} children={
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(0, 0, 0, 0.1)", paddingVertical: 8, paddingHorizontal: 10, borderRadius: 20, justifyContent: "center" }}>
                    <FontAwesome name="circle" size={10} color={event.status === "closed" ? "red" : "green"} />
                    <Text style={{ fontSize: 12 }}>{event.status === "closed" ? "Fechado" : "Em andamento"}</Text>
                </View>
            } />

            <ScrollView style={{ paddingTop: 40 }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                        <View style={{ width: "25%", borderWidth: 4, aspectRatio: 1, borderRadius: 100, overflow: 'hidden', borderColor: "#fff" }}>
                            <Image source={{ uri: event.image }} style={{ flex: 1 }} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "column", alignItems: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <Text style={styles.title}>{eventRating()}</Text>
                                    <AntDesign name="star" size={20} color="#fff" />
                                </View>
                                <Text style={styles.subtitle}>Avaliação</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: "#fff", backgroundColor: "#fff", marginHorizontal: 15, opacity: 0.4 }}></View>
                            <View style={{ flexDirection: "column", alignItems: "center" }}>
                                <Text style={styles.title}>{stands?.length}</Text>
                                <Text style={styles.subtitle}>Stands</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, flexDirection: "column" }}>
                        <Text style={styles.title}>{event.name}</Text>
                        <Text style={[styles.subtitle, { opacity: 0.7 }]}>{`@${company.name}`}</Text>
                    </View>

                    <View style={{ marginVertical: 20, gap: 5 }}>
                        <View style={{ flexDirection: "row", gap: 5, alignItems: "flex-start" }}>
                            <Feather name="map-pin" size={20} color="#fff" />
                            <Text style={[styles.text, { flexShrink: 1 }]}>{event.location}</Text>
                        </View>

                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <Feather name="calendar" size={20} color="#fff" />
                            <Text style={styles.text}>{new Date(event?.startDate).toLocaleDateString()}</Text>
                        </View>

                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <Feather name="clock" size={20} color="#fff" />
                            <Text style={styles.text}>{`${new Date(event?.startDate).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - ${new Date(event?.finishDate).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`}</Text>
                        </View>

                        <Text style={[styles.subtitle, { fontWeight: "700", marginVertical: 10 }]}>Descrição</Text>

                        <Text style={[styles.text, { marginBottom: 20 }]}>{event.description}</Text>
                    </View>
                </View>

                {Array.isArray(stands) && stands.length > 0 &&
                    <View style={{ backgroundColor: "#fff", alignItems: "center", borderTopLeftRadius: 50, borderTopEndRadius: 50, paddingBottom: 40 }}>
                        <Text style={[styles.title, { marginVertical: 20, color: globalColors.main }]}>Stands</Text>

                        <FlatList
                            data={[...stands].sort()}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <MainCard
                                        item={item}
                                        cardWidth={"98%"}
                                        pressable={false}
                                        buttonText={"Ver mais"}
                                        imageHeight={200}
                                        rating={true}
                                        onPress={() => { router.navigate(`/stands/${item._id}`) }}
                                    />
                                </View>
                            )}
                            scrollEnabled={false}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ marginTop: 20, paddingBottom: 40 }}
                        />
                    </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "700",
        color: "#fff",
        fontSize: 24
    },
    subtitle: {
        color: "#fff",
        fontWeight: "400",
        fontSize: 18,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        opacity: 0.7
    }
})
