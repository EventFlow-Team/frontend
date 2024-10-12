import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { globalColors, globalStyles } from '../../styles/globalStyles';
import { router } from 'expo-router';

export default function Events() {
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={[globalStyles.container, { marginHorizontal: 10, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between' }]}>
          <Text style={globalStyles.sectionTitle}>Eventos</Text>
         
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
});