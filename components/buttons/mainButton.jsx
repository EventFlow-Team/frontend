import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { globalColors } from '../../styles/globalStyles';

export default function MainButton({ onPress, text, border = false, loading = false }) {
    return (
        <TouchableOpacity onPress={onPress} style={border ? styles.borderButton : styles.mainButton}>
            {loading ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <Text style={border ? styles.borderButtonText : styles.buttonText}>{text}</Text>
            }

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainButton: {
        width: '100%',
        backgroundColor: globalColors.darkBlue,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        height: 60,
        justifyContent: 'center'
    },
    borderButton: {
        width: '100%',
        borderWidth: 1,
        borderColor: globalColors.darkBlue,
        padding: 15,
        borderRadius: 10,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "600"
    },
    borderButtonText: {
        color: globalColors.darkBlue,
        fontSize: 18,
        fontWeight: "600"
    }
})
