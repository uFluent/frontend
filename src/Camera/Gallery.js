import React from "react";
import { View, Image, Text } from "react-native";

import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";

import { AsyncStorage } from "react-native";

import { getPictureData, sayWord, translateWord } from "../../api";

import * as MediaLibrary from "expo-media-library";

import { styleMaker } from "./Gallery.styles";

export default class Gallery extends React.Component {
  state = {
    photoData: this.props.photoData,
    saved: false,
    word: null,
    fontSize: 50
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
      await AsyncStorage.setItem(uri, word);
    } catch (error) {
      // Error saving data
    }
  };

  speakWord = () => {
    sayWord(this.state.word, "es");
  };

  componentDidMount() {
    //This is causing a memory leak!!!!!
    // const photoInfo = getPictureData(this.state.photoData.base64);
    setTimeout(() => {
      translateWord("person", "es").then(result => {
        this.setState({ word: result });
      });
    }, 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.word !== prevState.word) {
      this.setState({ fontSize: 50 - this.state.word.length });
    }
  }

  render() {
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
