import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export const styleMaker = state => {
  let pictureOpacity = 1;
  if (state.guess !== null) {
    pictureOpacity = 0;
  }

  let feedbackColour = "green";
  if (state.guess === "incorrect") feedbackColour = "red";

  return StyleSheet.create({
    screen: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: winHeight * 0.8
    },
    title: {},
    pictureContainer: {
      height: 200,
      width: 200,
      position: "relative"
    },
    pictureOverlay: {
      height: 200,
      width: 200,
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around"
    },
    picture: {
      resizeMode: "cover",
      height: 200,
      minWidth: 200,
      opacity: pictureOpacity,
      zIndex: -10,
      position: "absolute"
    },
    options: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: winWidth,
      height: winHeight * 0.3
    },
    wordOption: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: winWidth / 3,
      height: 40,
      backgroundColor: "grey",
      marginTop: 10
    },
    wordOptionButton: {
      width: winWidth / 3,
      height: 40
    },
    correctGuess: {
      backgroundColor: "green"
    },
    incorrectGuess: {
      backgroundColor: "orange"
    },
    otherGuess: { opacity: 0.5 },
    guessConfirmationText: {
      fontSize: 40,
      color: feedbackColour
    },
    speakWord: {
      backgroundColor: "orange",
      width: 30,
      height: 30
    }
  });
};
