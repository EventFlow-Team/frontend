import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import { useUser } from '../../services/contexts/userContext';
import { useUserEvents } from '../../services/contexts/userEventsContext'; 
import SearchBar from '../../components/navBar/searchBar';
import Api from '../../services/api';
import MainCard from '../../components/cards/mainCard';
import MainModal from '../../components/modals/mainModal';
import Toast from 'react-native-toast-message';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEvent, setOpenEvent] = useState({});

  const { user, getUser } = useUser();
  const { userEvent, getUserEvents } = useUserEvents();

  const getEvents = async () => {
    await Api.get('/event')
      .then(response => {
        setEvent(response.data.events);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  const handleOpenEvent = (id) => {
    setOpenEvent(event.find(item => item._id === id));
    setOpenModal(true);
  };

  const handleCloseEvent = () => {
    setOpenModal(false);
    setOpenEvent({});
  };

  const onSubmitAddEvent = async (id) => {
    setLoading(true);

    await Api.put(`/event/add_user/${id}`)
      .then(response => {
        console.log(response.data);
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Você foi adicionado ao evento.',
        });
        handleCloseEvent();
        getUserEvents();
        getEvents();
        router.navigate('/events');
      })
      .catch(error => {
        console.log(error.response.data);
        handleCloseEvent();
        Toast.show({
          type: 'info',
          text1: 'Ops!',
          text2: 'Você já está participando desse evento.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmitRemoveEvent = async (id) => {
    setLoading(true);

    await Api.put(`/event/remove_user/${id}`)
      .then(response => {
        console.log(response.data);
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Você saiu do evento.',
        });
        handleCloseEvent();
        getUserEvents();
        getEvents();
        router.navigate('/events');
      })
      .catch(error => {
        console.log(error.response.data);
        handleCloseEvent();
        Toast.show({
          type: 'info',
          text1: 'Ops!',
          text2: 'Você não está participando desse evento.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getUser();
    getEvents();
    getUserEvents();
  }, []);

  const isUserInEvent = (id) => {
    return userEvent?.find(item => item._id === id);
  };

  return (
    <View style={globalStyles.container}>
      <SearchBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: globalColors.secundary, borderRadius: 10, paddingVertical: 40, paddingHorizontal: 15, gap: 10, marginVertical: 25, elevation: 15 }}>
          <Text style={[globalStyles.title, { color: "#fff" }]}>Impulsione seus eventos</Text>
          <Text style={[globalStyles.bannerText, { color: "#fff", width: "70%" }]}>Você tem a chance de priorizar seu projeto e atrair a atenção dos profissionais mais qualificados.</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <TouchableOpacity style={[globalStyles.button, { marginTop: 10 }]}>
              <Text style={globalStyles.buttonText} onPress={() => router.navigate('/auth/company/register')} >Criar Evento</Text>
            </TouchableOpacity>
            <Image source={require("../../assets/imgs/logo.png")} style={{ resizeMode: "stretch", width: 76, height: 43 }} />
          </View>
        </View>

        <Text style={[globalStyles.sectionTitle, { marginBottom: 10, marginLeft: 10 }]}>Eventos Próximos</Text>

        <View style={{ alignItems: "center" }}>
          <FlatList
            data={[...event].reverse()}
            renderItem={({ item }) => (
              <MainCard
                item={item}
                cardWidth={"48%"}
                onPress={() => handleOpenEvent(item._id)}
              />
            )}
            keyExtractor={item => item._id}
            numColumns={2}
            scrollEnabled={false}
            nestedScrollEnabled={true}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 40, paddingHorizontal: 5 }}
          />
        </View>
      </ScrollView>

      <MainModal isOpen={openModal} onRequestClose={handleCloseEvent}>
        <MainCard
          item={openEvent}
          cardWidth={"95%"}
          pressable={false}
          description={true}
          buttonText={isUserInEvent(openEvent._id) ? "Sair" : "Participar"}
          borderButton={isUserInEvent(openEvent._id)}
          onPress={isUserInEvent(openEvent._id) ? () => onSubmitRemoveEvent(openEvent._id) : () => onSubmitAddEvent(openEvent._id)}
          loading={loading}
        />
      </MainModal>
    </View>
  );
}