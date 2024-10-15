import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';
import { FontAwesome6 } from '@expo/vector-icons';
import SearchBar from '../../components/navBar/searchBar';
import Api from '../../services/api';

export default function Events() {
  const [event, setEvent] = useState([]);

  const getEvents = async () => {
    await Api.get('/event/user')
      .then(response => {
        setEvent(response.data.events);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={globalStyles.container}>
      <SearchBar />

      <View style={{ marginHorizontal: 10, paddingTop: 25, flex: 1 }}>
        <Text style={globalStyles.sectionTitle}>Meus eventos</Text>

        {event.length > 0 ?
          <Text>TEste</Text>
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

const styles = StyleSheet.create({
});