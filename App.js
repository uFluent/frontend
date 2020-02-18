import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/Home";
import Profile from "./src/Profile/Profile";
import { CameraPage } from "./src/Camera/Camera";
import HeaderBar from "./src/Headers/HeaderBar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerTitle: props => <HeaderBar {...props} /> }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraPage}
          options={{ headerTitle: props => <HeaderBar {...props} /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
