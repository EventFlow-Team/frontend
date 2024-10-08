import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import SearchBar from '../../components/navBar/searchBar';
import { EventsList } from '../../components/flatLists/eventsList';

const Card = ({ title, subtitle, date, onSeeMore, onParticipate }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {/* Add your event icon here */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={onSeeMore}>
          <Text style={styles.button}>Ver mais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onParticipate}>
          <Text style={styles.button}>Participar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Home() {
  const eventsData = [
    { title: 'EPA', subtitle: '@epa_etc_fu', date: 'Dia: 12/12/2024 Hora: 12:00 - 20:00' },
    { title: 'EPA2', subtitle: '@epa_etc_fu', date: 'Dia: 12/12/2024 Hora: 12:00 - 20:00' },
    { title: 'EPA', subtitle: '@epa_etc_fu', date: 'Dia: 12/12/2024 Hora: 12:00 - 20:00' },
    
    // Add more event data here
  ];

  return (
    <View style={globalStyles.container}>
      <SearchBar />
      <ScrollView>
        <View style={{ backgroundColor: globalColors.secundary, borderRadius: 10, paddingVertical: 40, paddingHorizontal: 15, gap: 10, marginVertical: 25, elevation: 15 }}>
          <Text style={[globalStyles.title, { color: "#fff" }]}>Impulsione seus eventos</Text>
          <Text style={[globalStyles.bannerText, { color: "#fff", width: "70%" }]}>Você tem a chance de priorizar seu projeto e atrair a atenção dos profissionais mais qualificados.</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <TouchableOpacity style={[globalStyles.button, { marginTop: 10 }]}>
              <Text style={globalStyles.buttonText} onPress={() => router.navigate('/auth/user/login')} >Criar Evento</Text>
            </TouchableOpacity>
            <Image source={require("../../assets/imgs/logo.png")} style={{ resizeMode: "stretch", width: 76, height: 43 }} />
          </View>
        </View>

        <View style={[globalStyles.container, {marginHorizontal: 10, alignContent:'center', justifyContent: 'space-between' }]}>
          <Text style={[globalStyles.sectionTitle, {marginBottom:10,}]}>Eventos</Text>
          {eventsData.map((event, index) => (
            <Card
              key={index}
              title={event.title}
              subtitle={event.subtitle}
              date={event.date}
              onSeeMore={() => console.log('Ver mais')}
              onParticipate={() => console.log('Participar')}
              style={{ width: '48%' }} // Added style for card width
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius:3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 
 '#ccc', // Adjust border color as needed
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBody: {
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  button:{

    width: '100%',
    borderWidth: 1,
    borderColor: globalColors.darkBlue,
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    fontSize: 13,
  },
});