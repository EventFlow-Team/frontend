import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useUser } from '../../services/contexts/userContext';

import { globalStyles } from '../../styles/globalStyles';
import { router } from 'expo-router';

export default function SearchBar({ title }) {
    const { user } = useUser();

    return (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", paddingHorizontal: 10, paddingBottom: 10, paddingTop: 50, backgroundColor: "#fff", elevation: 5, justifyContent: "space-between", height: "14%" }}>
            {title ?
                <>
                    <Text style={globalStyles.sectionTitle}>{title}</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <TouchableOpacity>
                            <Feather name='search' size={24} color={"#000"} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="bell" size={24} color={"#000"} />
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>
                    <TouchableOpacity style={globalStyles.roundedInput} >
                        <Text>Pesquisar...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.navigate('/profile')} style={{ width: 40, height: 40, borderRadius: 20, elevation: 10, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.3)" }}>
                        <Image source={{ uri: user?.image }} style={{ flex: 1, borderRadius: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="bell" size={24} color={"#000"} />
                    </TouchableOpacity>
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({

});