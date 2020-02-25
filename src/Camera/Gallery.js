import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";

import { AsyncStorage } from "react-native";

import { getPictureData, sayWord, translateWord } from "../../api";

import * as MediaLibrary from "expo-media-library";

import { styleMaker } from "./Gallery.styles";

import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";

import { SimpleAnimation } from "react-native-simple-animations";
import LoadingDots from "react-native-loading-dots";

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
    sayWord(this.state.word, this.props.userData.language);
  };

  sendImageData = async () => {
    // const photoInfo = await getPictureData(this.state.photoData.base64);
    // console.log(photoInfo);
    setTimeout(() => {
      const englishWord = "elephant";
      translateWord("elephant", this.props.userData.language).then(result => {
        this.setState({
          word: result,
          englishWord: englishWord
        });
      });
    }, 3000);
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
              {/* <Ionicons name="md-camera" size={30} style={styles.cameraIcons} /> */}
              <Ionicons
                name="md-return-left"
                size={30}
                style={styles.cameraIcons}
              />
            </View>
          </Button>

          {this.state.word ? (
            <SimpleAnimation
              delay={100}
              duration={1000}
              direction="right"
              staticType="bounce"
              distance={60}
              // friction={4}
            >
              <View style={styles.saveButton}>
                <Button
                  onPress={() => this.savePhoto(this.state.photoData.uri)}
                >
                  <Ionicons name="md-save" size={30} />
                </Button>
              </View>
            </SimpleAnimation>
          ) : (
            <Text>{""}</Text>
          )}
        </View>
        <View style={styles.lowerText}>
          <View style={styles.loadingScreen}>
            {!this.state.word ? (
              <LoadingDots />
            ) : (
              <Text style={{ fontSize: this.state.fontSize }}>
                {`${this.state.word || "..."}`.toUpperCase()}
              </Text>
            )}
          </View>
          <View style={styles.speakButton}>
            <AwesomeButtonCartman
              type="secondary"
              style={{
                marginTop: 10
              }}
              size="small"
              borderRadius={(20, 50)}
              height={70}
              textSize={30}
              width={70}
              backgroundColor="#edff8f"
              borderColor="#ffb3ba"
              backgroundDarker="#ff9668"
              raiseLevel={5}
              onPress={this.speakWord}
            >
              <Ionicons name="md-volume-high" size={45} />
            </AwesomeButtonCartman>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
