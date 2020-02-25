import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { AsyncStorage } from "react-native";
import Button from "react-native-button";

import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

import { getListOfWords, words } from "./Words";

import { sayWord, getGenericPicture, translateWord } from "../../api";

import { styleMaker } from "./Quiz.Styles";

import styled from "../Styles";
import LottieView from "lottie-react-native";

export default class PictureMatch extends Component {
  state = {
    currentPage: {
      question: null,
      answer: null,
      translatedQuestion: null,
      pictures: null
    },
    nextPage: {
      question: null,
      answer: null,
      translatedQuestion: null,
      pictures: null
    },
    guessedPicture: null,
    language: this.props.userData.language,
    guess: null,
    disabledNext: false
  };

  async componentDidMount() {
    await this.getQuestion("currentPage");
    await this.getPictures("currentPage");
    this.prepareNextPage();
  }

  getQuestion = async page => {
    const questionWord = words[Math.floor(Math.random() * words.length)];
    const translatedQuestion = await translateWord(
      questionWord,
      this.state.language
    );
    this.setState(
      {
        [page]: {
          ...this.state[page],
          question: questionWord,
          answer: questionWord,
          translatedQuestion: translatedQuestion
        }
      },
      () => {
        return "done";
      }
    );
  };

  getPictures = async page => {
    let num = Math.ceil(this.props.userData.score / 10);
    if (num > 3) num = 3;
    const picArray = [];
    console.log(this.state[page].question);
    //push correct pic into array
    const correctUri = await getGenericPicture(
      words.indexOf(this.state[page].question) + 1
    );

    picArray.push(correctUri.pictureData);
    console.log(picArray);
    //push more pics into array
    for (let i = 0; i < num; i++) {
      const uri = await getGenericPicture(Math.ceil(Math.random() * 80)).catch(
        err => {
          console.log("error here");
        }
      );
      if (!picArray.includes(uri.pictureData)) picArray.push(uri.pictureData);
      else {
        const uri = await getGenericPicture(
          Math.ceil(Math.random() * 80)
        ).catch(err => {
          console.log("error here");
        });
        if (!picArray.includes(uri.pictureData)) picArray.push(uri.pictureData);
      }
    }
    //set pictures to array of the uris
    // if (num > 2) num = 2;
    // const newWords = await getListOfWords(
    //   this.state[page].answer,
    //   num + 2,
    //   "en"
    // );
    this.setState(
      {
        [page]: {
          ...this.state[page],
          pictures: picArray.sort(function() {
            return 0.5 - Math.random();
          }),
          answer: correctUri.pictureData
        },
        disabledNext: false
      },
      () => {
        return "done";
      }
    );
  };

  guessPicture = picture => {
    if (picture === this.state.currentPage.answer) {
      this.setState({ guess: "correct" });
      this.props.increaseScore();
    } else {
      this.setState({ guess: "incorrect", guessedPicture: picture });
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
    await this.getQuestion("nextPage");
    await this.getPictures("nextPage");
    return "prepared";
  };

  render() {
    const styles = styleMaker(this.state);
    console.log(this.state);

    let feedback = "Great!";
    if (this.state.guess === "incorrect") {
      feedback = "Not quite!";
    }

    if (this.state.currentPage.pictures) {
      return (
        <View style={styles.screen}>
          <Text>Word Match</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              {this.state.currentPage.translatedQuestion}
            </Text>
            <View style={styles.speakWord}>
              <Button
                onPress={() =>
                  sayWord(
                    this.state.currentPage.translatedQuestion,
                    this.state.language
                  )
                }
              >
                <Ionicons name="md-megaphone" size={30} />
              </Button>
            </View>
            {this.state.guess !== null && (
              <View style={styles.pictureOverlay}>
                <Text style={styles.guessConfirmationText}>{feedback}</Text>
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
          <View style={styles.pictureOptions}>
            {this.state.currentPage.pictures.map(picture => {
              return (
                <View
                  key={picture}
                  style={
                    !this.state.guess
                      ? styles.pictureOption
                      : this.state.currentPage.answer === picture
                      ? { ...styles.pictureOption, ...styles.correctGuess }
                      : this.state.guessedPicture === picture
                      ? { ...styles.pictureOption, ...styles.incorrectGuess }
                      : { ...styles.pictureOption, ...styles.otherGuess }
                  }
                >
                  <Button
                    onPress={() => this.guessPicture(picture)}
                    style={{ width: 140, height: 140 }}
                  >
                    <Image
                      source={{
                        uri: picture
                      }}
                      style={{ width: 140, height: 140 }}
                    ></Image>
                  </Button>
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
