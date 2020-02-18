import React from "react";
import { View, Text } from "react-native";

import styles from "./HeaderBar.styles";

export default props => {
  return (
    <View>
      <Text style={styles.headerText}>{props.children}</Text>
    </View>
  );
};
