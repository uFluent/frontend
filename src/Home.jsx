import React from "react";
import { Text, View, Image } from "react-native";

import * as MediaLibrary from "expo-media-library";

import styles from "./Styles";

class Home extends React.Component {
  state = {
    picUri: "",
    uri: ""
  };

  getPicture = async () => {
    const pictures = await MediaLibrary.getAssetsAsync();
    const pic =
      pictures.assets[Math.ceil(Math.random() * pictures.assets.length)];

    const localId = await MediaLibrary.getAssetInfoAsync(pic.id);
    console.log(pictures);
    this.setState({ picUri: localId.localUri, uri: pic.uri });
  };

  componentDidMount() {
    this.getPicture();
  }

  render() {
    return (
      <View style={styles.alignCenter}>
        <Text>Hello</Text>
        <Image
          source={{ uri: this.state.uri }}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }
}

export default Home;
