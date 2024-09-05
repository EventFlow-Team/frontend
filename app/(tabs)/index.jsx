import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import SearchBar from '../../components/navBar/searchBar';
import { EventsList } from '../../components/flatLists/eventsList';

export default function Home() {
    return (
        <View style={globalStyles.container}>
            <SearchBar />
            <ScrollView>
                <View style={{ backgroundColor: globalColors.secundary, borderRadius: 10, paddingVertical: 40, paddingHorizontal: 15, gap: 10, marginVertical: 25, elevation: 15 }}>
                    <Text style={[globalStyles.title, { color: "#fff" }]}>Impulsione seus eventos</Text>
                    <Text style={[globalStyles.bannerText, { color: "#fff", width: "70%" }]}>Você tem a chance de priorizar seu projeto e atrair a atenção dos profissionais mais qualificados.</Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <TouchableOpacity style={[globalStyles.button, { marginTop: 10 }]}>
                            <Text style={globalStyles.buttonText}>Criar Evento</Text>
                        </TouchableOpacity>
                        <Image source={require("../../assets/imgs/logo.png")} style={{ resizeMode: "stretch", width: 76, height: 43 }} />
                    </View>
                </View>

                <View style={[globalStyles.container, { marginHorizontal: 10 }]}>
                    <Text style={globalStyles.sectionTitle}>Eventos</Text>
                
                    <EventsList />
                </View>
            </ScrollView>
        </View>
    )
}
