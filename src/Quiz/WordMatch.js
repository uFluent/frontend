import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { AsyncStorage } from "react-native";
import Button from "react-native-button";

import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

import { getListOfWords } from "./Words";

import { sayWord, getGenericPicture } from "../../api";

import { styleMaker } from "./Quiz.Styles";

import styled from "../Styles";
import LottieView from "lottie-react-native";

export default class PictureMatch extends Component {
  state = {
    currentPage: {
      image: null,
      answer: null,
      translatedAnswer: null,
      words: null
    },
    nextPage: {
      image: null,
      answer: null,
      translatedAnswer: null,
      words: null
    },
    guessedWord: null,
    language: this.props.userData.language,
    guess: null,
    disabledNext: false
  };

  async componentDidMount() {
    await this.getPicture("currentPage");
    await this.getWords("currentPage");
    this.prepareNextPage();
  }

  getPicture = async page => {
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
      //Get word
      const correctWord = await AsyncStorage.getItem(
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FcameraApp-33d6ed69-a607-41a5-9687-1eb6229ce0d9/Camera/" +
          pic.uri.slice(32)
      );
      //Set state
      this.setState(
        {
          [page]: {
            ...this.state[page],
            image: pic.uri,
            answer: correctWord
          }
        },
        () => {
          return "done";
        }
      );
    } else {
      //Get picture and word from backend
      const randomNum = Math.ceil(Math.random() * 80);
      const pic = await getGenericPicture(randomNum).catch(err => {
        this.prepareNextPage();
      });
      const imageUri = pic.pictureData;
      const correctWord = pic.word;
      this.setState(
        {
          [page]: {
            ...this.state[page],
            image: imageUri,
            answer: correctWord
          }
        },
        () => {
          return "done";
        }
      );
    }
  };

  getWords = async page => {
    let num = Math.ceil(this.props.userData.score / 10);
    if (num > 2) num = 2;
    const newWords = await getListOfWords(
      this.state[page].answer,
      num + 2,
      this.state.language
    );
    this.setState(
      {
        [page]: {
          ...this.state[page],
          words: newWords[0],
          translatedAnswer: newWords[1]
        },
        disabledNext: false
      },
      () => {
        return "done";
      }
    );
  };

  guessWord = word => {
    if (word === this.state.currentPage.translatedAnswer) {
      this.setState({ guess: "correct" });
      this.props.increaseScore();
    } else {
      this.setState({ guess: "incorrect", guessedWord: word });
    }
  };

  nextWord = () => {
    this.setState(
      { disabledNext: true, currentPage: this.state.nextPage, guess: null },
      () => {
        this.prepareNextPage();
      }
    );
  };

  prepareNextPage = async () => {
    await this.getPicture("nextPage");
    await this.getWords("nextPage");
    return "prepared";
  };

  render() {
    const styles = styleMaker(this.state);
    // console.log(this.state);

    let feedback = "Great!";
    if (this.state.guess === "incorrect") {
      feedback = "Not quite!";
    }

    if (this.state.currentPage.words) {
      return (
        <View style={styles.screen}>
          <Text>Picture Match</Text>
          <View style={styles.pictureContainer}>
            <Image
              source={{ uri: this.state.currentPage.image }}
              style={styles.picture}
            />
            {this.state.guess !== null && (
              <View style={styles.pictureOverlay}>
                <Text style={styles.guessConfirmationText}>{feedback}</Text>
                <View style={styles.speakWord}>
                  <Button
                    onPress={() =>
                      sayWord(
                        this.state.currentPage.translatedAnswer,
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
            {this.state.currentPage.words.map(word => {
              return (
                <View
                  style={
                    !this.state.guess
                      ? styles.wordOption
                      : this.state.currentPage.translatedAnswer === word
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
                    style={styles.wordOptionButton}
                  >
                    {word}
                  </Button>

                  {!this.state.guess && (
                    <View style={styles.speakWord}>
                      <Button onPress={() => (word, this.state.language)}>
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
      return (
        <View style={styled.alignCenter}>
          <LottieView
            source={require("../animations/226-splashy-loader (1).json")}
            autoPlay
          />
        </View>
      );
    }
  }
}
