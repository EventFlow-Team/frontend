import React from 'react'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';

export default function EventProfile() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}