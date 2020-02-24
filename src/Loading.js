import React from "react";
import { Text, View } from "react-native";

import styles from "./Styles";

export default function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <Text>Loading Screen</Text>
    </View>
  );
}
