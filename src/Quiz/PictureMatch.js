import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { AsyncStorage } from "react-native";
import Button from "react-native-button";

import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

import { getListOfWords } from "./Words";

import { sayWord, getGenericPicture, translateWord } from "../../api";

import { styleMaker } from "./Quiz.Styles";

export default class PictureMatch extends Component {
  state = {
    image: null,
    correctWord: null,
    translatedCorrectWord: null,
    incorrectWords: [],
    language: this.props.userData.language,
    guess: null,
    guessedWord: null,
    disabledNext: false
  };

  componentDidMount() {
    this.getPicture();
  }

  getPicture = async () => {
    //Decided whether to get picture from phone album or backend
    const albumData = await MediaLibrary.getAlbumAsync("Expo");
    const numberOfPicturesInPhone = albumData.assetCount;
    if (Math.random() > (1 / numberOfPicturesInPhone) * 2) {
      //Get picture from phone
      const pictures = await MediaLibrary.getAssetsAsync({
        album: "-2075771444"
      });
      const pic =
        pictures.assets[Math.floor(Math.random() * pictures.assets.length)];
      console.log(pic.uri);
      this.setState({ image: pic.uri, correctWord: null });
    } else {
      //Get picture from backend
      const randomNum = Math.ceil(Math.random() * 80);
      //Change number 10 on above line to match number of pictures we have in backend
      const pic = await getGenericPicture(randomNum);
      const imageUri = pic.pictureData;
      const correctWord = pic.word;
      let num = this.props.userData.score;
      if (num > 3) num = 3;
      const newWords = await getListOfWords(
        correctWord,
        num + 2,
        this.state.language
      );
      this.setState({
        image: imageUri,
        correctWord: correctWord,
        incorrectWords: newWords[0],
        translatedCorrectWord: newWords[1],
        disabledNext: false
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.image !== prevState.image && !this.state.correctWord) {
      this.getWord();
    }
    if (
      this.state.correctWord !== prevState.correctWord &&
      this.state.incorrectWords[0] !== prevState.incorrectWords[0]
    ) {
      this.setState({ guess: null });
    }
  }

  getWord = async () => {
    const correctWord = await AsyncStorage.getItem(
      "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FcameraApp-33d6ed69-a607-41a5-9687-1eb6229ce0d9/Camera/" +
        this.state.image.slice(32)
    );
    //The name of the directory keeps changing somehow! ^^^
    let num = this.props.userData.score;
    if (num > 3) num = 3;
    const newWords = await getListOfWords(
      correctWord,
      num + 2,
      this.state.language
    );
    //Change second argument in this function to reference the user level ^^^

    this.setState({
      correctWord: correctWord,
      incorrectWords: newWords[0],
      translatedCorrectWord: newWords[1],
      disabledNext: false
    });
  };

  guessWord = word => {
    if (word === this.state.translatedCorrectWord) {
      this.setState({ guess: "correct" });
      this.props.increaseScore();
    } else {
      this.setState({ guess: "incorrect", guessedWord: word });
    }
  };

  nextWord = () => {
    this.setState({ disabledNext: true });
    this.getPicture();
  };

  render() {
    const styles = styleMaker(this.state);

    let feedback = "Great!";
    if (this.state.guess === "incorrect") {
      feedback = "Not quite!";
    }

    if (this.state.image) {
      return (
        <View style={styles.screen}>
          <Text>Picture Match</Text>
          <View style={styles.pictureContainer}>
            <Image source={{ uri: this.state.image }} style={styles.picture} />
            {this.state.guess !== null && (
              <View style={styles.pictureOverlay}>
                <Text style={styles.guessConfirmationText}>{feedback}</Text>
                <View style={styles.speakWord}>
                  <Button
                    onPress={() =>
                      sayWord(
                        this.state.translatedCorrectWord,
                        this.state.language
                      )
                    }
                  >
                    <Ionicons name="md-megaphone" size={30} />
                  </Button>
                </View>
                <Button
                  style={styles.nextButton}
                  onPress={this.nextWord}
                  disabled={this.state.disabledNext}
                >
                  Next
                </Button>
              </View>
            )}
          </View>
          <View style={styles.options}>
            {this.state.incorrectWords.map(word => {
              return (
                <View
                  style={
                    !this.state.guess
                      ? styles.wordOption
                      : this.state.translatedCorrectWord === word
                      ? { ...styles.wordOption, ...styles.correctGuess }
                      : this.state.guessedWord === word
                      ? { ...styles.wordOption, ...styles.incorrectGuess }
                      : { ...styles.wordOption, ...styles.otherGuess }
                  }
                  key={word}
                >
                  <Button
                    onPress={() => this.guessWord(word)}
                    disabled={this.state.guess !== null}
                  >
                    {word}
                  </Button>
                  {!this.state.guess && (
                    <View style={styles.speakWord}>
                      <Button
                        onPress={() => sayWord(word, this.state.language)}
                      >
                        <Ionicons name="md-megaphone" size={30} />
                      </Button>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
}
