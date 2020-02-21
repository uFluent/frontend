import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { AsyncStorage } from "react-native";
import Button from "react-native-button";

import * as MediaLibrary from "expo-media-library";

import { getListOfWords } from "./Words";

export default class PictureMatch extends Component {
  state = {
    image: null,
    correctWord: null,
    incorrectWords: [],
    language: "no"
  };

  getPicture = async () => {
    const pictures = await MediaLibrary.getAssetsAsync({
      album: "-2075771444"
    });
    const pic =
      pictures.assets[Math.floor(Math.random() * pictures.assets.length)];
    this.setState({ image: pic.uri });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.image !== prevState.image) {
      console.log(this.state.image.slice(32));
      this.getWord();
    }
  }

  getWord = async () => {
    const correctWord = await AsyncStorage.getItem(
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FcameraApp-33d6ed69-a607-41a5-9687-1eb6229ce0d9/Camera/" +
        this.state.image.slice(32)
    );
    //The name of the directory keeps changing! ^^^
    const newWords = await getListOfWords(correctWord, 3, this.state.language);

    this.setState({
      correctWord: correctWord,
      incorrectWords: newWords
    });
  };

  componentDidMount() {
    this.getPicture();
  }

  render() {
    if (this.state.image) {
      return (
        <View>
          <Text>Picture Match</Text>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 300, height: 300 }}
          />
          <View>
            {this.state.incorrectWords.map(word => {
              return <Button>{word}</Button>;
            })}
          </View>
        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
}
