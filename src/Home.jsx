import React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import styles from "./Styles";

const Stack = createStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.alignCenter}>
      <Text>Hello</Text>

      <Button
        title="CameraPage"
        onPress={() => navigation.navigate("Camera")}
      />
    </View>
  );
};

export default Home;
