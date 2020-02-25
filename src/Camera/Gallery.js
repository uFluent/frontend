import React from "react";
import { View, Image, Text } from "react-native";

import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";

import { AsyncStorage } from "react-native";

import { getPictureData, sayWord, translateWord } from "../../api";

import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";

import { styleMaker } from "./Gallery.styles";

// import ImageCompressor from "@trunkrs/react-native-image-compressor";

export default class Gallery extends React.Component {
  state = {
    photoData: this.props.photoData,
    saved: false,
    word: null,
    fontSize: 50,
    englishWord: null
  };

  savePhoto = async uri => {
    if (!this.state.saved && this.state.word) {
      const asset = await MediaLibrary.createAssetAsync(uri);
      MediaLibrary.createAlbumAsync("Expo", asset, false);
      this.storeData(uri, this.state.word);
      this.setState({ saved: true });
    }
  };

  storeData = async (uri, word) => {
    try {
      await AsyncStorage.setItem(uri, this.state.englishWord);
    } catch (error) {}
  };

  speakWord = () => {
    sayWord(this.state.word.split("_").join(" "), this.props.userData.language);
  };

  sendImageData = async () => {
    // const photoInfo = await getPictureData(this.state.photoData.base64);
    // console.log(photoInfo);
    const manipResult = await ImageManipulator.manipulateAsync(
      this.state.photoData.uri,
      [{ resize: { width: 224, height: 224 } }],
      { format: "jpeg", base64: true }
    );
    const photoData = await getPictureData(manipResult.base64);
    console.log(photoData, "<<<<<<");
    const englishWord = photoData;
    translateWord(
      englishWord.split("_").join(" "),
      this.props.userData.language
    ).then(result => {
      this.setState({
        word: result || "nothing",
        englishWord: englishWord
      });
    });
    // setTimeout(() => {
    //   const englishWord = "elephant";
    //   translateWord("elephant", this.props.userData.language).then(result => {
    //     this.setState({
    //       word: result,
    //       englishWord: englishWord
    //     });
    //   });
    // }, 3000);
  };

  componentDidMount() {
    this.sendImageData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.word !== prevState.word) {
      this.setState({ fontSize: 50 - this.state.word.length });
    }
  }

  render() {
    console.log(this.props.userData);
    const styles = styleMaker(this.state.saved, this.state.word);
    return (
      <React.Fragment>
        <View style={styles.background}>
          <Image
            style={styles.preview}
            source={{ uri: this.state.photoData.uri }}
          />
        </View>
        <View style={styles.topButtons}>
          <Button onPress={this.props.returnToCamera}>
            <View style={styles.cameraButton}>
              <Ionicons name="md-camera" size={30} style={styles.cameraIcons} />
              <Ionicons
                name="md-return-left"
                size={30}
                style={styles.cameraIcons}
              />
            </View>
          </Button>
          <View style={styles.saveButton}>
            <Button onPress={() => this.savePhoto(this.state.photoData.uri)}>
              <Ionicons name="md-save" size={30} />
            </Button>
          </View>
        </View>
        <View style={styles.lowerText}>
          <Text style={{ fontSize: this.state.fontSize }}>
            {this.state.word}
          </Text>
          <Button onPress={this.speakWord}>
            <View style={styles.speakButton}>
              <Ionicons name="md-megaphone" size={30} />
            </View>
          </Button>
        </View>
      </React.Fragment>
    );
  }
}
