import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { AsyncStorage } from "react-native";
import { words } from "./Words";
import Button from "react-native-button";
import { translateWord } from "../../api";
export default class PictureMatch extends Component {
  state = {
    image: "",
    correctWord: null,
    incorrectWords: [],
    language: "es"
  };

  getPicture = async () => {
    const pictures = await MediaLibrary.getAssetsAsync({
      album: "-2075771444"
    });
    const pic =
      pictures.assets[Math.floor(Math.random() * pictures.assets.length)];
    this.setState({ image: pic.uri });
    this.getWord();
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.image !== this.state.image) {
  //     this.getWord();
  //     this.setState({
  //       incorrectWords: [...newWords, this.state.correctWord]
  //     });
  //   }
  // }
  getWord = async () => {
    const correctWord = await AsyncStorage.getItem(
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FcameraApp-500e2e9a-69d7-4999-83b5-ef4229e757b4/Camera/" +
        this.state.image.slice(32)
    );
    const newWords = [];
    for (let i = 0; i < 2; i++) {
      newWords.push(words[Math.floor(Math.random() * words.length)]);
    }
    newWords.push(correctWord);
    const translatedWord = [];
    newWords.map(word => {
      translateWord(word, this.state.language).then(result => {
        translatedWord.push(result[0].translation);
      })
    })
    
    console.log(translatedWord.length,newWords.length );
    if (translatedWord.length === newWords.length) {

      console.log(newWords, translatedWord);
      this.setState({
        correctWord: correctWord,
        incorrectWords: translatedWord.sort(function() {
          return 0.5 - Math.random();
        })
      });
    }
  };
  componentDidMount() {
    this.getPicture();
  }
  render() {
    // console.log(this.state.incorrectWords);
    return (
      <View>
        <Text>Picture match</Text>
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
  }
}
