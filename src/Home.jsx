import React from "react";
import { Text, View, Image } from "react-native";

import * as MediaLibrary from "expo-media-library";

import styles from "./Styles";

class Home extends React.Component {
  render() {
    return (
      <View style={styles.alignCenter}>
        <Text>uFluent</Text>
      </View>
    );
  }
}

export default Home;
