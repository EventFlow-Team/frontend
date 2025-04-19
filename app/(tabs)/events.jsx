import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';
import { FontAwesome6 } from '@expo/vector-icons';
import { useUserEvents } from '../../services/contexts/userEventsContext';
import SearchBar from '../../components/navBar/searchBar';
import MainCard from '../../components/cards/mainCard';
import { router } from 'expo-router';

export default function Events() {
  const { userEvent, getUserEvents } = useUserEvents();

  useEffect(() => {
    getUserEvents();
  }, []);

  return (
    <View style={globalStyles.container}>
      <SearchBar title={`Meus Eventos ( ${userEvent.length} )`} />

      <View style={{ marginHorizontal: 10, flex: 1 }}>
        {userEvent.length > 0 ?
          <>
            <FlatList
              data={[...userEvent]}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View style={{ flex: 1, alignItems: "center" }}>
                  <MainCard
                    item={item}
                    cardWidth={"95%"}
                    pressable={false}
                    imageHeight={200}
                    buttonText={"Ver mais"}
                    onPress={() => { router.navigate(`/events/${item._id}`) }}
                  />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 20, paddingBottom: 40 }}
            />
          </>
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 20, gap: 10 }}>
            <FontAwesome6 name="calendar-times" size={50} color="gray" />
            <Text style={{ color: "gray", fontWeight: "600", fontSize: 18, textAlign: "center" }}>Você não está em nenhum evento no momento</Text>
          </View>

        }
      </View>
    </View>
  );
}
