import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import SearchBar from '../../components/navBar/searchBar';
import { EventsList } from '../../components/flatLists/eventsList';
import { router } from 'expo-router';

const handleSubmit = async () => {

      router.navigate('/auth/user/register3');
      return; 
    }
const Card = ({ title, subtitle, date, onSeeMore, onParticipate }) => {
  return (
    <View style={styles.card}>
      
      <View style={styles.cardFooter}>
        <TouchableOpacity onPress={onSeeMore}>
          <Text style={styles.button}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.date}>{date}</Text>
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
      <ScrollView>
        <View style={[globalStyles.container, { marginHorizontal: 10, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between' }]}>
          <Text style={globalStyles.sectionTitle}>Eventos</Text>
          {eventsData.map((event, index) => (
            <Card
              key={index}
              title={event.title}
              subtitle={event.subtitle}
              date={event.date}
              onSeeMore={() => router.navigate('/events/eventProfile')}
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
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius:3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc', // Adjust border color as needed
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardBody: {
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 100,
    alignItems: 'center',
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
    borderRadius: 10,
    alignItems: 'center',
    fontSize: 13,
    borderRadius: 100,
    
        


  },
});