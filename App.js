import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/Home";
import Profile from "./src/Profile/Profile";
import { CameraPage } from "./src/Camera/Camera";
import HeaderBar from "./src/Headers/HeaderBar";
import QuizPicture from "./src/Quiz/Quiz.Picture";
import Gallery from "./src/Camera/Gallery";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#d9bde3"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: null,
            headerTitle: props => <HeaderBar {...props} />
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerLeft: null,
            headerTitle: props => <HeaderBar {...props} />
          }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraPage}
          options={{
            headerLeft: null,
            headerTitle: props => <HeaderBar {...props} />
          }}
        />
        <Stack.Screen
          name="QuizPicture"
          component={QuizPicture}
          options={{
            headerLeft: null,
            headerTitle: props => <HeaderBar {...props} />
          }}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{
            headerLeft: null,
            headerTitle: props => <HeaderBar {...props} />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
