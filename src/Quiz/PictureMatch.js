import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default class PictureMatch extends Component {
  state = {
    image: ""
  };

  getPicture = async () => {
    const pictures = await MediaLibrary.getAssetsAsync({
      album: "-2075771444"
    });
    const pic =
      pictures.assets[Math.ceil(Math.random() * pictures.assets.length)];
    this.setState({ image: pic.uri });
  };

  componentDidMount() {
    this.getPicture();
  }
  render() {
    return (
      <View>
        <Text>Picture match</Text>
        <Image
          source={{ uri: this.state.image }}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }
}
