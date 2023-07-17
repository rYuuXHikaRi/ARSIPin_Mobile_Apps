import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Local
import LoginPage from "./components/screens/loginPage";
import DashBoard from "./components/screens/dashBoard";
import ManajemenBerkas from "./components/screens/manajemenBerkas";
import ManajemenAkun from "./components/screens/manajemenAkun";
import RiwayatUnduhan from "./components/screens/riwayatUnduhan";
import ProfilePage from "./components/screens/profilePage";
import PopUpTaccnt from "./components/screens/popUp";
import detailBerkas from "./components/screens/detailBerkas";
import dropdowntes from "./components/screens/dropdowntes";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen
          name="dropdowntes"
          component={dropdowntes}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="manajemenakun"
          component={ManajemenAkun}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="manajemenberkas"
          component={ManajemenBerkas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dashboard"
          component={DashBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profilepage"
          component={ProfilePage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="riwayatunduhan"
          component={RiwayatUnduhan}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="detailberkas"
          component={detailBerkas}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
