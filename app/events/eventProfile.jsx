import { View, Text, StyleSheet, Image, Dimensions, VirtualizedList, ScrollView, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { globalColors, globalStyles } from '../../styles/globalStyles';

const width = Dimensions.get('window');

export default function eventProfile() {

    const EventCard = ({ event }) => {
        return (
            <View style={styles.eventCard}>
                <View style={styles.iconContainer}>
                    <AntDesign name="food" size={24} color="orange" />
                    <AntDesign name="calendar" size={24} color="gray" />
                </View>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.date}>{event.date}</Text>
                <Text style={styles.time}>{event.time}</Text>
                <Text style={styles.description}>{event.description}</Text>
            </View>
        );
    };

    const avaliation = 4.8;
    const stands = 10;
    const eventName = "EPA";
    const eventDescription = "O propósito do evento é mostrar a toda a comunidade regional os cursos gratuitos oferecidos pela unidade escolar e o potencial de inserção de nossos alunos do ensino médio/técnico no mercado de trabalho.";



    return (
        <View style={[globalStyles.container, { backgroundColor: globalColors.main, }]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, paddingTop: 20 }}>
                <Image source={require('../../assets/imgs/authBackground.png')} style={{ height: 80, width: 80, borderRadius: "100%", borderWidth: 3, borderColor: "#fff", marginLeft: 5, }} />

                <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={styles.statisticsContainer}>
                        <View style={styles.statistcsSubContainer}>
                            <Text style={[globalStyles.welcomeText, { color: "#fff" }]}>{avaliation}</Text>
                            <AntDesign name="star" color={"#fff"} size={15} />
                        </View>
                        <Text style={styles.statistcsText}>Avaliação</Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: "#fff" }}></View>
                    <View style={styles.statisticsContainer}>
                        <View style={styles.statistcsSubContainer}>
                            <Text style={[globalStyles.welcomeText, { color: "#fff" }]}>{stands}</Text>
                        </View>
                        <Text style={styles.statistcsText}>Stands</Text>
                    </View>
                </View>
            </View>

            <View style={{ alignItems: 'center', paddingHorizontal: 15, marginTop: 10, }}>
                <Text style={[globalStyles.welcomeText, { color: "#fff", textAlign: 'center' }]}>{eventName}</Text>
            </View>

            <View style={{ paddingHorizontal: 15, marginTop: 10, }}>
                <Text style={[globalStyles.text, { color: "#fff", textAlign: 'justify' }]}>{eventDescription}</Text>
            </View>

            <View style={styles.eventCard}>
                <View style={styles.iconContainer}>
                    <AntDesign name="food" size={24} color="orange" />
                    <AntDesign name="calendar" size={24} color="gray" />
                </View>
                <Text style={styles.title}>teste</Text>
                <Text style={styles.date}>08/04/2007</Text>
                <Text style={styles.time}>12:00 - 18:00</Text>
                <Text style={styles.description}> descriçãodescriçãodescriçãodescriçãodescrição</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    statisticsContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 30,
    },
    statistcsSubContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    statistcsText: {
        fontSize: 15,
        color: "#fff",
    }
});