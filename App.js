import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import LoginPage from './components/screens/loginPage';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
              name="login"
              component={LoginPage}
              options={{ headerShown: false}}
          /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
