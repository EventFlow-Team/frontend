import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import { globalStyles, globalColors } from '../../styles/globalStyles';

export default function SearchBar() {
    return (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginHorizontal: 10 }}>
            <TextInput placeholder='Pesquisar...' style={globalStyles.roundedInput} />
            <TouchableOpacity style={{ borderWidth: 1, padding: 15, borderRadius: 100 }}>
                <FontAwesome5 name="user-alt" size={14} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="more-horizontal" size={24} color={globalColors.main}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});