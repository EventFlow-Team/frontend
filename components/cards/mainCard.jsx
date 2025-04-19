import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons'
import Api from '../../services/api';
import MainButton from '../buttons/mainButton';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function MainCard({
    item,
    cardWidth,
    pressable = true,
    onPress,
    description = false,
    buttonText,
    borderButton = false,
    loading = false,
    border = true,
    imageHeight = 100,
    buttonWidth = "25%",
    stand = false,
    location = false,
    rating = false,
    ratingController = false,
}) {
    const [company, setCompany] = useState({});
    const [line, setLine] = useState({});
    const [ratingValue, setRatingValue] = useState(0);
    const [ratingLoading, setRatingLoading] = useState(false);

    const evaluationSchema = yup.object().shape({
        rating: yup.string().required('Por favor, selecione uma avaliação.'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(evaluationSchema),
        defaultValues: { rating: '' }
    });

    const getCompanyById = async () => {
        await Api.get(`/company/${item?.companyId}`)
            .then(response => {
                setCompany(response.data.company);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    const getLineByStandId = async () => {
        await Api.get(`/line/stand/${item?._id}`)
            .then(response => {
                setLine(response.data.line);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    const onSubmitEvaluation = async (data) => {
        setRatingLoading(true);

        await Api.put(`/stand/rating/${item._id}`, {
            rating: data.rating
        })
            .then(response => {
                console.log(response.data);
                Toast.show({
                    type: 'success',
                    text1: 'Avaliação realizada com sucesso!',
                    text2: 'Obrigado por avaliar!',
                });
                router.back()
            })
            .catch(error => {
                console.log(error.response.data);
            })
            .finally(() => {
                setRatingLoading(false);
            });
    };

    const getRating = async () => {
        const rating = Math.min((item?.rating.reduce((acc, curr) => acc + curr, 0) / item?.rating.length).toFixed(1), 5)
        setRatingValue(rating);
    };

    useEffect(() => {
        if (item?.companyId) {
            getCompanyById();
        }
        if (stand === true && item?._id) {
            getLineByStandId();
        }
        if (rating) {
            getRating();
        }
    }, []);

    const cardContent = () => {
        return (
            <View style={{ paddingBottom: 20 }}>
                <View style={globalStyles.cardHeader}>
                    <View style={{
                        width: 43,
                        aspectRatio: 1,
                        borderWidth: 1,
                        borderColor: "rgba(0, 0, 0, 0.3)",
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

                    {rating && item?.rating?.length > 0 &&
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Text style={{ color: globalColors.main, fontWeight: "500" }}>
                                {ratingValue}
                            </Text>
                            <AntDesign name="star" size={16} color={globalColors.main} />
                        </View>
                    }

                </View>

                <ScrollView>
                    <View>
                        <ImageBackground source={{ uri: item?.image }} style={{ width: "100%", height: imageHeight }}>
                            {stand === false &&
                                <View style={{ position: "absolute", flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(0, 0, 0, 0.6)", paddingVertical: 3, paddingHorizontal: 10, borderRadius: 20, justifyContent: "center", margin: 5 }}>
                                    <FontAwesome name="circle" size={10} color={item?.status === "closed" ? "red" : "lightgreen"} />
                                    <Text style={{ fontSize: 12, color: "#fff", fontWeight: "500" }}>{item?.status === "closed" ? "Fechado" : "Em andamento"}</Text>
                                </View>
                            }
                        </ImageBackground>
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        {buttonText ?
                            <View style={{ marginTop: 10, marginBottom: 15 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                                    <TouchableOpacity>
                                        <Feather name='info' size={26} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[borderButton ? styles.borderButton : styles.button, { width: buttonWidth }]} onPress={onPress}>
                                        {loading ?
                                            <ActivityIndicator size="small" color={borderButton ? globalColors.main : "#fff"} />
                                            :
                                            <Text style={borderButton ? styles.borderButtonText : styles.buttonText}>{buttonText}</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontWeight: "700", width: "90%", fontSize: 16 }} >{item?.name}</Text>
                                    {item?.userId &&
                                        <View style={{ flexDirection: "row", gap: 3 }}>
                                            <Feather name='user' size={18} color={globalColors.main} />
                                            <Text style={{ color: globalColors.main }}>{item?.userId.length}</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            :
                            <View style={{ marginTop: 10, marginBottom: 15, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontWeight: "700", fontSize: 16 }} >{item?.name}</Text>
                            </View>
                        }

                        {location &&
                            <View>
                                <Text style={styles.text}>{`Local: ${item?.location}`}</Text>
                            </View>
                        }

                        {stand && line.length > 0 &&
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.title}>Detalhes da fila</Text>
                                {line.map((item, index) => (
                                    <View key={index}>
                                        <Text style={{ marginBottom: 5 }}>{item?.name}</Text>
                                        <Text style={styles.text}>{`• Tamanho da fila: ${item?.userId.length} pessoas`}</Text>
                                        <Text style={styles.text}>{`• Grupo: ${item?.group} pessoas por vez`}</Text>
                                        <Text style={styles.text}>{`• Estimativa de tempo por grupo: ${item?.timeEstimate} minutos`}</Text>
                                    </View>
                                ))}
                            </View>
                        }

                        <View style={{ justifyContent: "flex-end", marginTop: 20 }}>
                            <Text style={styles.text}>INFO</Text>
                            <Text style={styles.text}>{`Dia: ${new Date(item?.startDate).toLocaleDateString()}`}</Text>
                            <Text style={styles.text}>{`Hora: ${new Date(item?.startDate).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - ${new Date(item?.finishDate).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`}</Text>
                        </View>

                        {description &&
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.title}>Descrição</Text>
                                <Text style={styles.text}>{item?.description}</Text>
                            </View>
                        }

                        {stand && item?.giftImage.length > 0 && (
                            <View style={{ paddingBottom: 20, marginTop: 20 }}>
                                <Text style={[styles.title, { marginBottom: 15 }]}>Brindes</Text>

                                <View style={{ flexDirection: "column", gap: 5 }}>
                                    {item?.giftImage.map((giftImage, index) => (
                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 10 }}>
                                            <Image
                                                source={{ uri: giftImage }}
                                                style={{ width: 50, height: 50, borderRadius: 8, backgroundColor: '#ccc' }}
                                            />
                                            <Text style={{ fontSize: 14 }}>{item?.giftDescription[index]}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {ratingController &&
                            <View style={{ gap: 20, marginTop: 10, marginBottom: 40 }}>
                                <Controller
                                    control={control}
                                    name="rating"
                                    render={({ field: { onChange, value } }) => (
                                        <>
                                            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
                                                <Picker
                                                    selectedValue={value}
                                                    onValueChange={onChange}
                                                    style={{ height: 50 }}
                                                >
                                                    <Picker.Item label="Selecione uma nota" value="" />
                                                    <Picker.Item label="1 - Muito ruim" value="1" />
                                                    <Picker.Item label="2 - Ruim" value="2" />
                                                    <Picker.Item label="3 - Regular" value="3" />
                                                    <Picker.Item label="4 - Bom" value="4" />
                                                    <Picker.Item label="5 - Excelente" value="5" />
                                                </Picker>
                                            </View>

                                            {errors.rating && <Text style={globalStyles.errorText}>{errors.rating.message}</Text>}
                                        </>
                                    )}
                                />

                                <MainButton loading={ratingLoading} onPress={handleSubmit(onSubmitEvaluation)} text="Avaliar" />

                            </View>
                        }

                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <>
            {pressable ?
                <TouchableOpacity style={[globalStyles.cardContainer, { marginBottom: 10, width: cardWidth, elevation: border ? 5 : 0 }]} onPress={onPress}>
                    {cardContent()}
                </TouchableOpacity>
                :
                <View style={[globalStyles.cardContainer, { marginBottom: 10, width: cardWidth, elevation: border ? 5 : 0 }]}>
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
    title: {
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 5
    }
});