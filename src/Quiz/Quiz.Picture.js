import React from "react";
import { Text, View, Image } from "react-native";

import * as MediaLibrary from "expo-media-library";

import styles from "./Quiz.Styles.js";

export default class QuizPicture extends React.Component {
  state = {
    uri: ""
  };

  getPicture = async () => {
    const pictures = await MediaLibrary.getAssetsAsync({
      album: "-2075771444"
    });
    const pic =
      pictures.assets[Math.ceil(Math.random() * pictures.assets.length)];
    this.setState({ uri: pic.uri });
  };

  componentDidMount() {
    this.getPicture();
  }

  render() {
    return (
      <View style={styles.alignCenter}>
        <Image
          source={{ uri: this.state.uri }}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }
}
