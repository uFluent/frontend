import React from "react";
import { View, Text } from "react-native";
import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./HeaderBar.styles";

export default props => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerText}>{props.children}</Text>
      <Button
        style={styles.homeButton}
        styleDisabled={styles.homeButton}
        onPress={() => handlePress()}
      >
        <Ionicons name="md-home" size={30} style={styles.homeButton} />
      </Button>
    </View>
  );
};
