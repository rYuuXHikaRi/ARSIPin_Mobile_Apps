import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DashBoard from './components/screens/dashBoard';
import ManajemenBerkas from './components/screens/manajemenBerkas';
import ManajemenAkun from './components/screens/manajemenAkun';
import RiwayatUnduhan from './components/screens/riwayatUnduhan';
import ProfilePage from './components/screens/profilePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>

    <Stack.Screen

        name="profilepage"
        component={ProfilePage}

        options={{ headerShown: false}}
    />


    <Stack.Screen

        name="riwayatunduhan"
        component={RiwayatUnduhan}

        options={{ headerShown: false}}
      />

    <Stack.Screen

        name="manajemenakun"
        component={ManajemenAkun}

        options={{ headerShown: false}}
      />
      
    <Stack.Screen

        name="manajemenberkas"
        component={ManajemenBerkas}

        options={{ headerShown: false}}
        />
      <Stack.Screen

          name="dashboard"
          component={DashBoard}

          options={{ headerShown: false}}
      />
            
    </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
