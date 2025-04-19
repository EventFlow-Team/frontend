import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';

import { globalStyles } from '../../styles/globalStyles';
import { FontAwesome6 } from '@expo/vector-icons';
import { useUserLines } from '../../services/contexts/userLinesContext';
import SearchBar from '../../components/navBar/searchBar';
import LineCard from '../../components/cards/lineCard';
import Api from '../../services/api';

export default function Lines() {
    const [loading, setLoading] = useState(false);
    const { userLine, getUserLines } = useUserLines();

    const onSubmitRemoveUser = async (id) => {
        setLoading(true);

        await Api.put(`/line/remove_user/${id}`)
            .then(response => {
                console.log(response.data);
                getUserLines();
            })
            .catch(error => {
                console.log(error.response.data);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getUserLines();
    }, []);

    return (
        <View style={globalStyles.container}>
            <SearchBar title={`Minhas Filas ( ${userLine.length} )`} />

            <View style={{ marginHorizontal: 10, flex: 1 }}>
                {userLine.length > 0 ?
                    <>
                        <FlatList
                            data={[...userLine]}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => (
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <LineCard
                                        item={item}
                                        cardWidth={"95%"}
                                        buttonText={"Sair"}
                                        loading={loading}
                                        onPress={() => onSubmitRemoveUser(item._id)}
                                    />
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ marginTop: 20, paddingBottom: 40 }}
                        />
                    </>
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 20, gap: 10 }}>
                        <FontAwesome6 name="users-slash" size={50} color="gray" />
                        <Text style={{ color: "gray", fontWeight: "600", fontSize: 18, textAlign: "center" }}>Você não está em nenhuma fila no momento</Text>
                    </View>

                }
            </View>
        </View>
    );
}
