import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

import { Feather, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  const colorBackground = "#rgba(2, 128, 254, 0.5)";

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#49454F', tabBarStyle: {height: "7%"} }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Feather size={28} name="home" color={color} style={[styles.background, { backgroundColor: focused ? colorBackground : 'transparent' }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          title: 'Eventos',
          tabBarIcon: ({ color, focused }) => (
            <Feather size={28} name="calendar" color={color} style={[styles.background, { backgroundColor: focused ? colorBackground : 'transparent' }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="lines"
        options={{
          headerShown: false,
          title: 'Filas',
          tabBarIcon: ({ color, focused }) => (
            <Feather size={28} name="users" color={color} style={[styles.background, { backgroundColor: focused ? colorBackground : 'transparent' }]} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  background: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexDirection: "row"
  },
});