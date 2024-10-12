import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useUser } from '../../services/contexts/userContext';

import { globalStyles, globalColors } from '../../styles/globalStyles';

export default function SearchBar() {
    const { user } = useUser();

    return (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginHorizontal: 10 }}>
            <TextInput placeholder='Pesquisar...' style={globalStyles.roundedInput} />
            <TouchableOpacity style={{ borderWidth: 1, padding: 15, borderRadius: 100 }}>
               <Image source={{ uri: user?.image }} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="notifications" size={24} color={"#000"}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});