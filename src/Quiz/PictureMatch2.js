import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacityBase,
  TouchableHighlightBase,
  ImageBackground
} from "react-native";
import { AsyncStorage } from "react-native";
import Button from "react-native-button";

import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

import { getListOfWords } from "./Words";

import { sayWord, getGenericPicture } from "../../api";

import { styleMaker } from "./Quiz.Styles";

import styled from "../Styles";
import LottieView from "lottie-react-native";

import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import { SimpleAnimation } from "react-native-simple-animations";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

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
    disabledNext: false,
    fontLoaded: false
  };

  async componentDidMount() {
    await this.getPicture("currentPage");
    await this.getWords("currentPage");
    this.prepareNextPage();
    await Font.loadAsync({
      "Mansalva-Regular": require("../../assets/fonts/Mansalva-Regular.ttf")
    });
    await Font.loadAsync({
      "Baloo-Regular": require("../../assets/fonts/Baloo-Regular.ttf")
    });
    return this.setState({ fontLoaded: true });
  }

  getPicture = async page => {
    //Decided whether to get picture from phone album or backend
    const albumData = await MediaLibrary.getAlbumAsync("Expo");
    let numberOfPicturesInPhone = 0;
    if (albumData) numberOfPicturesInPhone = albumData.assetCount;
    if (Math.random() > 2 / numberOfPicturesInPhone) {
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
      {
        disabledNext: true,
        currentPage: this.state.nextPage,
        guess: null,
        guessedWord: null
      },
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
    console.log(this.state);

    let feedback = "Great!";

    if (this.state.guess === "incorrect") {
      feedback = "Not quite!";
    }

    if (this.state.currentPage.words) {
      return (
        <View style={styles.screen}>
          <View style={styles.selection}>
            <View style={styles.pictureContainer}>
              <SimpleAnimation
                delay={500}
                duration={1000}
                // direction="right"
                staticType="bounce"
                distance={20}
                friction={4}
              >
                <Image
                  source={{ uri: this.state.currentPage.image }}
                  style={styles.picture}
                />
              </SimpleAnimation>
              {this.state.guess !== null && (
                <View style={styles.pictureOverlay}>
                  <Text style={[styles.guessConfirmationText]}>{feedback}</Text>

                  {this.state.guess === "correct" ? (
                    <LottieView
                      source={require("../animations/4052-smoothymon-typing.json")}
                      autoPlay
                      style={{ marginBottom: 15 }}
                    ></LottieView>
                  ) : (
                    <LottieView
                      source={require("../animations/4053-crying-smoothymon.json")}
                      autoPlay
                      style={{ marginBottom: 10 }}
                    ></LottieView>
                  )}
                  <AwesomeButtonCartman
                    type="secondary"
                    size="small"
                    height={50}
                    textSize={15}
                    textColor="white"
                    backgroundColor="orange"
                    style={styles.nextButton}
                    onPress={this.nextWord}
                    disabled={this.state.disabledNext}
                  >
                    Next
                  </AwesomeButtonCartman>
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
                    <SimpleAnimation
                      delay={500}
                      duration={2000}
                      // direction="right"
                      staticType="zoom"
                      distance={20}
                      // friction={4}
                    >
                      <AwesomeButtonCartman
                        type="secondary"
                        size="medium"
                        borderRadius={10}
                        height={50}
                        textSize={15}
                        textColor={
                          this.state.guessedWord === word && this.state.guess
                            ? "white"
                            : this.state.guess &&
                              this.state.currentPage.translatedAnswer === word
                            ? "white"
                            : "black"
                        }
                        backgroundColor={
                          !this.state.guess
                            ? "yellow"
                            : this.state.currentPage.translatedAnswer === word
                            ? "green"
                            : this.state.guessedWord === word
                            ? "red"
                            : null
                        }
                        onPress={() => this.guessWord(word)}
                        disabled={this.state.guess !== null}

                        // style={styles.wordOptionButton}
                      >
                        {word.charAt(0).toUpperCase() + word.slice(1)}
                      </AwesomeButtonCartman>
                    </SimpleAnimation>
                    {!this.state.guess && (
                      <View style={styles.speakWord}>
                        <SimpleAnimation
                          delay={500}
                          duration={2000}
                          staticType="zoom"
                          distance={20}
                        >
                          <AwesomeButtonCartman
                            type="secondary"
                            size="small"
                            borderRadius={(20, 50)}
                            height={50}
                            width={40}
                            onPress={() => sayWord(word, this.state.language)}
                          >
                            <Ionicons
                              name="md-volume-high"
                              size={25}
                              color="yellow"
                            />
                          </AwesomeButtonCartman>
                        </SimpleAnimation>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
          {/* </LinearGradient> */}
        </View>
      );
    } else {
      return (
        <View style={styled.alignCenter}>
          <LottieView
            source={require("../animations/2523-loading.json")}
            autoPlay
          />
        </View>
      );
    }
  }
}
