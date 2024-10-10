import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
  const colorBackground = "#rgba(2, 128, 254, 0.5)";

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#49454F' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 size={22} name="home" color={color} style={[styles.background, { backgroundColor: focused ? colorBackground : 'transparent' }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          title: 'Eventos',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 size={22} name="calendar" color={color} style={[styles.background, { backgroundColor: focused ? colorBackground : 'transparent' }]} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 size={22} name="user" color={color} style={[styles.background, { backgroundColor: focused ? colorBackground : 'transparent' }]} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  background: {
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexDirection: "row"
  },
});