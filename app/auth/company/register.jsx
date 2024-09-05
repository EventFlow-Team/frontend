import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { globalStyles, globalColors } from '../../../styles/globalStyles'
import MainButton from '../../../components/buttons/mainButton'
import { router } from 'expo-router'

export default function CompanyRegister() {
  return (
    <View style={[globalStyles.container, { alignItems: "center", justifyContent: "center", backgroundColor: globalColors.main, paddingHorizontal: 30 }]}>
      <Text style={{ fontSize: 18, textAlign: "center", color: "#fff", fontWeight: "500", marginBottom: 20 }}>Registro empresarial indisponível no momento</Text>
        <MainButton text="voltar" onPress={() => { router.back() }} />
    </View>
  )
}

const styles = StyleSheet.create({

})