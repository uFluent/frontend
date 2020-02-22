import React from "react";
import { View, Text } from "react-native";
import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./HeaderBar.styles";

export default props => {
  const colorStyle = currentPage => {
    if (currentPage) return { backgroundColor: "white", color: "#d9bde3" };
    else return { backgroundColor: "#d9bde3", color: "white" };
  };
  const navigation = useNavigation();
  const handlePress = targetPath => {
    navigation.navigate(targetPath);
  };
  return (
    <View style={styles.headerBar}>
      <Button onPress={() => handlePress("Home")}>
        <Ionicons
          name="md-home"
          size={30}
          style={[styles.homeButton, colorStyle(props.children === "Home")]}
        />
      </Button>
      <Button onPress={() => handlePress("Profile")}>
        <Ionicons
          name="md-person"
          size={30}
          style={[styles.homeButton, colorStyle(props.children === "Profile")]}
        />
      </Button>
    </View>
  );
};
