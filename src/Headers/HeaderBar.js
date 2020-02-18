import React from "react";
import { View, Text } from "react-native";
import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./HeaderBar.styles";

export default props => {
  const navigation = useNavigation();
  const handlePress = targetPath => {
    navigation.navigate(targetPath);
  };
  return (
    <View style={styles.headerBar}>
      <Button
        style={styles.homeButton}
        styleDisabled={styles.homeButton}
        onPress={() => handlePress("Home")}
      >
        <Ionicons name="md-home" size={30} style={styles.homeButton} />
      </Button>
      <Button
        style={styles.homeButton}
        styleDisabled={styles.homeButton}
        onPress={() => handlePress("Profile")}
      >
        <Ionicons name="md-person" size={30} style={styles.homeButton} />
      </Button>
    </View>
  );
};
