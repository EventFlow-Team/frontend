import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { globalStyles } from '../../styles/globalStyles'

export default function MainHeader({ title, children }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", paddingHorizontal: 10, paddingBottom: 10, paddingTop: 50, elevation: 5, height: "13%" }}>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
                    <Feather name='arrow-left' size={30} color={"#000"} />
                </TouchableOpacity>

                <Text style={globalStyles.sectionTitle}>{title}</Text>
            </View> 
            <View>{children}</View>
        </View>
    )
}