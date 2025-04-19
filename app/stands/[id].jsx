import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { FontAwesome } from '@expo/vector-icons'
import { globalStyles } from '../../styles/globalStyles'
import { useUserLines } from '../../services/contexts/userLinesContext';
import MainHeader from '../../components/navBar/mainHeader'
import Api from '../../services/api'
import MainCard from '../../components/cards/mainCard';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MainButton from '../../components/buttons/mainButton';

export default function StandProfile() {
    const [loading, setLoading] = useState(false);
    const [stand, setStand] = useState({});
    const [line, setLine] = useState({});
    const { id } = useLocalSearchParams();
    const { userLine, getUserLines } = useUserLines();

    const evaluationSchema = yup.object().shape({
        rating: yup.string().required('Por favor, selecione uma avaliação.'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(evaluationSchema),
        defaultValues: { rating: '' }
    });

    const getStandById = async () => {
        await Api.get(`/stand/${id}`)
            .then(async response => {
                setStand(response.data.stand);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const getLineByStandId = async () => {
        Api.get(`/line/stand/${id}`)
            .then(async response => {
                setLine(response.data.line[0]);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    const onSubmitAddLine = async () => {
        setLoading(true);
        await Api.put(`/line/add_user/${line._id}`)
            .then(response => {
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'Você foi adicionado à fila.',
                });
                getUserLines();
                router.navigate("/lines");
            })
            .catch(error => {
                Toast.show({
                    type: 'info',
                    text1: 'Ops!',
                    text2: 'Você já está participando dessa fila.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getStandById();
        getLineByStandId();
    }, []);

    const isUserInLine = () => {
        return userLine?.find(item => item._id === line._id);
    };

    return (
        <View style={globalStyles.container}>
            <MainHeader title={"Detalhes do Stand"} children={
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(0, 0, 0, 0.1)", paddingVertical: 8, paddingHorizontal: 10, borderRadius: 20, justifyContent: "center" }}>
                    <FontAwesome name="circle" size={10} color={stand?.status === "closed" ? "red" : "green"} />
                    <Text style={{ fontSize: 12 }}>{stand?.status === "closed" ? "Fechado" : "Em andamento"}</Text>
                </View>
            } />

            <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 40 }} showsVerticalScrollIndicator={false}>
                {stand?.companyId &&
                    <MainCard
                        item={stand}
                        border={false}
                        imageHeight={200}
                        buttonWidth='30%'
                        pressable={false}
                        description={true}
                        location={true}
                        stand={true}
                        rating={true}
                        loading={loading}
                        buttonText={isUserInLine() ? "Ver fila" : "Entrar na fila"}
                        borderButton={isUserInLine() ? true : false}
                        ratingController={true}
                        onPress={isUserInLine() ? () => router.navigate('/lines') : () => onSubmitAddLine()}
                    />
                }
            </ScrollView>
        </View>
    );
}
