import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import SearchBar from '../../components/navBar/searchBar';
import { useUser } from '../../services/contexts/userContext';
import Api from '../../services/api';

export default function Home() {
  const { user, getUser } = useUser();
  const [event, setEvent] = useState([]);

  const getEvents = async () => {
    await Api.get('/event')
      .then(response => {
        setEvent(response.data.events);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const onSeeMore = (id) => {
    console.log(`Ver mais sobre o evento com id: ${id}`);
  };

  const onParticipate = (id) => {
    console.log(`Participar do evento com id: ${id}`);
  };

  useEffect(() => {
    getUser();
    getEvents();
  }, []);

  return (
    <View style={globalStyles.container}>
      <SearchBar />
      <ScrollView>
        <View style={{ backgroundColor: globalColors.secundary, borderRadius: 10, paddingVertical: 40, paddingHorizontal: 15, gap: 10, marginVertical: 25, elevation: 15 }}>
          <Text style={[globalStyles.title, { color: "#fff" }]}>Impulsione seus eventos</Text>
          <Text style={[globalStyles.bannerText, { color: "#fff", width: "70%" }]}>Você tem a chance de priorizar seu projeto e atrair a atenção dos profissionais mais qualificados.</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <TouchableOpacity style={[globalStyles.button, { marginTop: 10 }]}>
              <Text style={globalStyles.buttonText} onPress={() => router.navigate('/auth/login')} >Criar Evento</Text>
            </TouchableOpacity>
            <Image source={require("../../assets/imgs/logo.png")} style={{ resizeMode: "stretch", width: 76, height: 43 }} />
          </View>
        </View>

        <View style={[globalStyles.container, { marginHorizontal: 10, alignContent: 'center', justifyContent: 'space-between' }]}>
          <Text style={[globalStyles.sectionTitle, { marginBottom: 10 }]}>Eventos</Text>
          <FlatList
            data={[...event].reverse()}
            renderItem={({ item }) => (
              <Card item={item} onSeeMore={onSeeMore} onParticipate={onParticipate} />
            )}
            keyExtractor={item => item._id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingTop: 20 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const Card = ({ item, onSeeMore }) => {
  const [companyName, setComapanyName] = useState('');
  
  const getCompanyById = async () => {
    await Api.get(`/company/${item.companyId}`)
      .then(response => {
        setComapanyName(response.data.company.name);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  useEffect(() => { 
    getCompanyById();
  }, []);

  return (
    <View style={[globalStyles.cardContainer, { marginRight: 10, marginBottom: 10, width: "50%" }]}>
      <View style={globalStyles.cardHeader}>
        <Image source={item.image} style={{  }} />
        <View>
          <Text style={{  }}>{item.name}</Text>
          <Text>{companyName}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.date}>{item.startDate}</Text>
        <Text style={styles.date}>{item.finishDate}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={() => onSeeMore(item._id)}>
          <Text style={styles.button}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
});
