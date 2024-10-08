import { View, Text } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#593C9D' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ backgroundColor: focused ? '#0280FE' : 'transparent', borderRadius: 16, paddingHorizontal: 20, paddingVertical:4, flexDirection: "row",width: 64,
                height: 32, }}>
              <FontAwesome5 size={22} name="home" color={color}/>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          title: 'Eventos',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ backgroundColor: focused ? '#0280FE' : 'transparent', borderRadius: 16, paddingHorizontal: 20, paddingVertical:4, flexDirection: "row",width: 64,
                height: 32, }}>
              <FontAwesome5 size={22} name="calendar" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}