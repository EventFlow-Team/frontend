import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../services/contexts/userContext';

import { globalStyles } from '../../styles/globalStyles';
import { router } from 'expo-router';

export default function SearchBar() {
    const { user } = useUser();

    return (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", paddingHorizontal: 10, paddingBottom: 10, paddingTop: 50, backgroundColor: "#fff", elevation: 5 }}>
            <TextInput placeholder='Pesquisar...' style={globalStyles.roundedInput} />
            <TouchableOpacity onPress={() => router.navigate('/profile')} style={{ width: 40, height: 40, borderRadius: 20, elevation: 10, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.3)" }}>
                <Image source={{ uri: user?.image }} style={{ flex: 1, borderRadius: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="notifications" size={24} color={"#000"} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});